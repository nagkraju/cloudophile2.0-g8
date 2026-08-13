'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  attribute float aScale;
  varying float vPulse;

  void main() {
    vec3 p = position;
    float wave = sin((p.x * 0.7) + uTime * 0.32) * 0.08;
    p.y += wave;
    vPulse = 0.72 + 0.28 * sin(uTime * 0.8 + p.x + p.y);
    vec4 modelPosition = modelMatrix * vec4(p, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aScale * uPixelRatio * (18.0 / -viewPosition.z);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  varying float vPulse;

  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = smoothstep(0.5, 0.08, distanceToCenter);
    gl_FragColor = vec4(uColor, strength * vPulse * 0.85);
  }
`

function seededRandom(seed: number) {
  const value = Math.sin(seed * 999.91) * 43758.5453
  return value - Math.floor(value)
}

function NodeField() {
  const group = useRef<THREE.Group>(null)
  const material = useRef<THREE.ShaderMaterial>(null)

  const { positions, scales, connections } = useMemo(() => {
    const count = 110
    const pointPositions = new Float32Array(count * 3)
    const pointScales = new Float32Array(count)
    const linePositions: number[] = []

    for (let index = 0; index < count; index += 1) {
      const x = (seededRandom(index + 1) - 0.5) * 13
      const y = (seededRandom(index + 101) - 0.5) * 7
      const z = (seededRandom(index + 201) - 0.5) * 3 - 1
      pointPositions.set([x, y, z], index * 3)
      pointScales[index] = 1.4 + seededRandom(index + 301) * 2.2

      if (index > 0 && index % 3 !== 0) {
        const previous = (index - 1) * 3
        linePositions.push(
          pointPositions[previous], pointPositions[previous + 1], pointPositions[previous + 2],
          x, y, z,
        )
      }
    }

    return {
      positions: pointPositions,
      scales: pointScales,
      connections: new Float32Array(linePositions),
    }
  }, [])

  useFrame((state, delta) => {
    if (!group.current || !material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    group.current.rotation.y += delta * 0.012
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      state.pointer.y * 0.035,
      0.025,
    )
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      -state.pointer.x * 0.025,
      0.025,
    )
  })

  return (
    <group ref={group} rotation={[0.08, 0, -0.08]}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[connections, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#1877f2" transparent opacity={0.12} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{
            uTime: { value: 0 },
            uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) },
            uColor: { value: new THREE.Color('#7c5cff') },
          }}
        />
      </points>
    </group>
  )
}

export function CloudMesh() {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 52 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
      >
        <NodeField />
      </Canvas>
    </div>
  )
}
