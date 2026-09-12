import { readFile } from 'node:fs/promises'
import path from 'node:path'

import { ImageResponse } from 'next/og'

const wordmark = { width: 991, height: 123 }
// Bounding box of the cloud "O" glyph inside the wordmark.
const cloud = { left: 159, width: 135 }

export async function renderBrandIcon(size: number) {
  const file = await readFile(path.join(process.cwd(), 'public/brands/cloudophile3.png'))
  const src = `data:image/png;base64,${file.toString('base64')}`

  const scale = size / cloud.width
  const imgWidth = wordmark.width * scale
  const imgHeight = wordmark.height * scale
  const offsetX = -cloud.left * scale
  const offsetY = (size - imgHeight) / 2

  return new ImageResponse(
    (
      <div style={{ width: size, height: size, display: 'flex', overflow: 'hidden', position: 'relative' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt="" width={imgWidth} height={imgHeight} style={{ position: 'absolute', left: offsetX, top: offsetY }} />
      </div>
    ),
    { width: size, height: size },
  )
}
