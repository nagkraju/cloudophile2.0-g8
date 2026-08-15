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
    p.y += sin((p.x * 0.7) + uTime * 0.62) * 0.11;
    vPulse = 0.78 + 0.22 * sin(uTime * 1.45 + p.x + p.y);
    vec4 viewPosition = viewMatrix * modelMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = aScale * uPixelRatio * (24.0 / -viewPosition.z);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  varying float vPulse;
  void main() {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = smoothstep(0.5, 0.06, distanceToCenter);
    gl_FragColor = vec4(uColor, strength * vPulse);
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
    const count = 120
    const pointPositions = new Float32Array(count * 3)
    const pointScales = new Float32Array(count)
    const linePositions: number[] = []
    for (let index = 0; index < count; index += 1) {
      const x = (seededRandom(index + 1) - 0.5) * 13
      const y = (seededRandom(index + 101) - 0.5) * 7
      const z = (seededRandom(index + 201) - 0.5) * 3 - 1
      pointPositions.set([x, y, z], index * 3)
      pointScales[index] = 2 + seededRandom(index + 301) * 2.8
      if (index > 0 && index % 3 !== 0) {
        const previous = (index - 1) * 3
        linePositions.push(pointPositions[previous], pointPositions[previous + 1], pointPositions[previous + 2], x, y, z)
      }
    }
    return { positions: pointPositions, scales: pointScales, connections: new Float32Array(linePositions) }
  }, [])

  useFrame((state, delta) => {
    if (!group.current || !material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    group.current.rotation.y += delta * 0.03
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, state.pointer.y * 0.055, 0.04)
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -state.pointer.x * 0.04, 0.04)
  })

  return (
    <group ref={group} rotation={[0.08, 0, -0.08]}>
      <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[connections, 3]} /></bufferGeometry><lineBasicMaterial color="#73b9f6" transparent opacity={0.38} /></lineSegments>
      <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]} /><bufferAttribute attach="attributes-aScale" args={[scales, 1]} /></bufferGeometry><shaderMaterial ref={material} vertexShader={vertexShader} fragmentShader={fragmentShader} transparent depthWrite={false} blending={THREE.NormalBlending} uniforms={{ uTime: { value: 0 }, uPixelRatio: { value: Math.min(window.devicePixelRatio, 1.5) }, uColor: { value: new THREE.Color('#2b8de5') } }} /></points>
    </group>
  )
}

export function CloudMesh() {
  return <div className="pointer-events-none absolute inset-0 opacity-55" aria-hidden="true"><Canvas camera={{ position: [0, 0, 7], fov: 52 }} dpr={[1, 1.5]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}><NodeField /></Canvas></div>
}
