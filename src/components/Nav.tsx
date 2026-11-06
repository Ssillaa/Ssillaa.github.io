import { NAV_LINKS } from '../data'

export function Nav() {
  return (
    <header className="nav">
      <nav aria-label="Ana menü" className="container nav__inner">
        <a href="#ust" className="nav__brand">
          SB<span className="dot">.</span>
        </a>
        <div className="nav__links">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
