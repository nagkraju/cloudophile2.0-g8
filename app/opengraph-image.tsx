import { ImageResponse } from 'next/og'

export const alt = 'Nag Kakarla — Enterprise Cloud & AI Executive'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 80, background: '#141414', color: '#fff' }}>
        <div style={{ fontSize: 28, letterSpacing: 6, color: '#38bdf8', textTransform: 'uppercase' }}>Cloudophile</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24, lineHeight: 1.05 }}>Nag Kakarla</div>
        <div style={{ fontSize: 40, marginTop: 24, color: '#a1a1aa' }}>Enterprise Cloud & Agentic AI Executive</div>
      </div>
    ),
    size,
  )
}
