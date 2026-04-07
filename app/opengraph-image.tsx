import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = '咖啡蛤蜊'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image({ title }) {
  const t = typeof title === 'string' ? title : '咖啡蛤蜊 · CafeClam'
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #f5f0e8 0%, #e8e0d0 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 900, color: '#2c1a0e', marginBottom: 20 }}>
          ☕🐚
        </div>
        <div style={{ fontSize: 56, fontWeight: 700, color: '#2c1a0e', textAlign: 'center', padding: '0 40px' }}>
          {t}
        </div>
        <div style={{ fontSize: 24, color: '#c8531a', marginTop: 16, letterSpacing: 4 }}>
          CAFECLAM.TOP
        </div>
      </div>
    ),
    { ...size }
  )
}
