'use client'

export default function AuthorAvatar({ src, alt }) {
  return (
    <div className="author-avatar">
      <img
        src={src}
        alt={alt}
        className="author-avatar-img"
        onError={e => {
          e.target.style.display = 'none'
          e.target.nextSibling.style.display = 'flex'
        }}
      />
      <div className="author-avatar-fallback">🧑‍💻</div>
    </div>
  )
}
