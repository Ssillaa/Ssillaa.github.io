import { MARQUEE_ITEMS } from '../data'

function Group() {
  return (
    <div className="marquee__group">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} style={{ display: 'contents' }}>
          <span>{item}</span>
          <span className="marquee__dot" />
        </span>
      ))}
    </div>
  )
}

/** The scrolling band of skills; two copies so the loop has no seam. */
export function Marquee() {
  return (
    <div aria-hidden="true" className="marquee">
      <div className="marquee__track">
        <Group />
        <Group />
      </div>
    </div>
  )
}
