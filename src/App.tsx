import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Hero } from './components/Hero'
import { Marquee } from './components/Marquee'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useReveal } from './hooks/useReveal'

export function App() {
  useReveal()

  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Education />
        <Experience />
        <Projects />
        <Skills />
      </main>
      <Contact />
    </div>
  )
}
