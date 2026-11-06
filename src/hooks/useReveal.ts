import { useEffect } from 'react'

/**
 * Fades every `.rv` element up as it scrolls into view. Elements that are
 * already on screen, and every element when the visitor asks for reduced
 * motion, are shown at once.
 */
export function useReveal() {
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('.rv'))
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced || !('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}
