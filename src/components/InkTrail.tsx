import { useEffect, useRef } from 'react'

/**
 * A small pistachio ink dot that trails the pointer.
 * Only with a mouse, and never when the visitor asks for less motion.
 */
export function InkTrail() {
  const dot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const el = dot.current
    if (!fine || calm || !el) return

    let x = -100
    let y = -100
    let tx = -100
    let ty = -100
    let frame = 0

    const move = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      el.style.opacity = '1'
    }
    const leave = () => {
      el.style.opacity = '0'
    }
    const tick = () => {
      x += (tx - x) * 0.18
      y += (ty - y) * 0.18
      el.style.transform = `translate(${x + 10}px, ${y + 12}px)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', move)
    document.documentElement.addEventListener('pointerleave', leave)
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return <div ref={dot} className="ink-dot" aria-hidden="true" />
}
