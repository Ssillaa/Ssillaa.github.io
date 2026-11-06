import type { HobbyId } from '../data'
import { useLang } from '../i18n'
import { line } from './sketch'

/** Bölüm 5's two small cards: the choir and the bağlama. */
export function HobbyList() {
  const { t } = useLang()
  return (
    <ul className="hobbies">
      {t.hobbies.map((h) => (
        <li key={h.id} className="hobby">
          <HobbyDrawing id={h.id} />
          <span className="hobby__title">{h.title}</span>
          <span className="hobby__text">{h.text}</span>
        </li>
      ))}
    </ul>
  )
}

/** Small brass line drawings, in the same hand as the story's pictures. */
function HobbyDrawing({ id }: { id: HobbyId }) {
  return (
    <svg className="hobby__art" viewBox="0 0 120 64" aria-hidden="true">
      {(id === 'baglama' ? BAGLAMA : KORO).map(([d, thin], i) =>
        line(d, thin ? 1.1 : 1.8).map((path, n) => <path key={`${i}-${n}`} d={path} strokeWidth={thin ? 1.1 : 1.8} />),
      )}
    </svg>
  )
}

/** Each shape of an icon, and whether it is drawn with the thin pencil. */
const BAGLAMA: [string, boolean][] = [
  ['M8 34 C 8 18, 26 14, 40 22 L 44 26 L 44 42 L 40 46 C 26 54, 8 50, 8 34 Z', false],
  ['M44 30 H108 M44 38 H108 M108 28 V40 L116 38 V30 Z', false],
  ['M58 30 V38 M70 30 V38 M80 30 V38 M89 30 V38 M97 30 V38', true],
  ['M110 28 V22 M114 29 V23 M110 40 V46 M114 39 V45', true],
  ['M24 34 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', true],
]

const KORO: [string, boolean][] = [
  ['M30 34 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M60 30 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M90 34 m-8 0 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0', false],
  ['M16 62 C 18 50, 42 50, 44 62 M46 62 C 48 46, 72 46, 74 62 M76 62 C 78 50, 102 50, 104 62', false],
  ['M28 37 q2 2 4 0 M58 33 q2 3 4 0 M88 37 q2 2 4 0', true],
  ['M40 14 V4 L48 2 V12 M40 14 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0 M48 12 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0', true],
  ['M80 16 V6 M80 16 m-3 0 a3 2.4 0 1 0 6 0 a3 2.4 0 1 0 -6 0 M80 6 q5 2 6 7', true],
]
