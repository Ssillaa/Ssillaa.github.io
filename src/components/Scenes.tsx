import type { CSSProperties, JSX, ReactNode } from 'react'

import type { DrawingWords, SceneId } from '../data'
import { fillLines, line, wash } from './sketch'

/*
 * Pencil drawings (HIKAYE-PLANI.md, K4), drawn with Rough.js (`./sketch`).
 *
 * Each shape is written as a clean SVG path; Rough.js makes it hand-drawn:
 * lines that wobble, hatching, cross-hatching, dots and zigzags for shading,
 * and soft washes of colour. `pathLength={1}` lets CSS draw every line the
 * same way whatever its length, and `order` staggers the lines of a scene.
 */
type Tone = 'ink' | 'brass' | 'green' | 'sky'
type FillStyle = 'hachure' | 'cross-hatch' | 'dots' | 'zigzag' | 'dashed' | 'zigzag-line'

function Ink({ d, order = 0, tone = 'ink', thin = false }: { d: string; order?: number; tone?: Tone; thin?: boolean }) {
  const style = { '--i': order } as CSSProperties
  const width = thin ? 1.4 : 2.3
  return (
    <>
      {line(d, width).map((path, n) => (
        <path key={n} className={`ink ink--${tone}`} d={path} pathLength={1} strokeWidth={width} style={style} />
      ))}
    </>
  )
}

/** Pencil shading inside a shape: hatching, cross-hatching, dots or zigzag. */
function Fill({ d, tone = 'ink', style = 'hachure', gap = 7, angle = -38, weight = 1 }: { d: string; tone?: Tone; style?: FillStyle; gap?: number; angle?: number; weight?: number }) {
  return (
    <>
      {fillLines(d, style, gap, angle, weight).map((path, n) => (
        <path key={n} className={`fill fill--${tone}`} d={path} strokeWidth={weight} />
      ))}
    </>
  )
}

/** A light wash of colour under the lines, like watercolour on a sketch. */
function Wash({ d, tone = 'green' }: { d: string; tone?: 'green' | 'sun' | 'sky' | 'paper' | 'hair' }) {
  return (
    <>
      {wash(d).map((path, n) => (
        <path key={n} className={`wash wash--${tone}`} d={path} />
      ))}
    </>
  )
}

/** A word written by hand on the drawing. */
function Scribble({ x, y, size = 22, tone = 'ink', rotate = 0, order = 0, children }: { x: number; y: number; size?: number; tone?: 'ink' | 'brass'; rotate?: number; order?: number; children: ReactNode }) {
  return (
    <text
      className={`scribble scribble--${tone}`}
      x={x}
      y={y}
      fontSize={size}
      textAnchor="middle"
      transform={rotate ? `rotate(${rotate} ${x} ${y})` : undefined}
      style={{ '--i': order } as CSSProperties}
    >
      {children}
    </text>
  )
}

const GROUND = 'M20 470 C 170 466, 420 474, 580 468'

/* ---------- Kapak: the long road, with the years she has walked as milestones ---------- */
function Cover() {
  const road = 'M96 516 C 210 420, 290 330, 302 262 L314 262 C 330 330, 410 420, 520 516 Z'
  const crownL = 'M150 296 C 118 296, 110 328, 124 342 C 114 362, 140 378, 154 366 C 172 378, 194 360, 182 342 C 196 324, 178 296, 150 296 Z'
  const crownR = 'M478 292 C 448 292, 440 322, 454 336 C 444 354, 468 368, 482 358 C 500 370, 520 352, 508 336 C 522 318, 504 292, 478 292 Z'
  const mountains = 'M150 262 L226 176 L262 210 L326 142 L398 222 L436 192 L512 262 Z'
  return (
    <>
      {/* colour */}
      <Wash tone="sky" d="M82 132 C 82 112, 112 106, 124 118 C 132 102, 164 104, 166 122 C 186 120, 192 144, 172 148 H94 C 78 148, 72 134, 82 132 Z" />
      <Wash tone="sky" d="M296 86 C 296 72, 318 68, 326 78 C 334 68, 356 70, 356 84 C 368 84, 370 98, 358 100 H302 C 290 100, 288 88, 296 86 Z" />
      <Wash tone="sun" d="M436 110 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
      <Wash d="M20 290 C 80 236, 180 228, 300 262 C 290 340, 210 430, 96 516 L20 516 Z" />
      <Wash d="M316 262 C 400 226, 520 232, 584 286 L584 516 L520 516 C 410 420, 330 340, 316 262 Z" />
      <Wash tone="sun" d={road} />
      {/* shading */}
      <Fill d={mountains} gap={8} angle={60} />
      <Fill d="M436 110 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" tone="brass" style="zigzag" gap={6} angle={20} />
      <Fill d="M20 290 C 80 236, 180 228, 300 262 C 200 274, 100 286, 20 304 Z" tone="green" gap={8} />
      <Fill d="M316 262 C 400 226, 520 232, 584 286 C 500 280, 400 272, 316 264 Z" tone="green" gap={8} />
      <Fill d={road} tone="brass" style="dots" gap={17} weight={0.8} />
      <Fill d={crownL} tone="green" style="cross-hatch" gap={6} />
      <Fill d={crownR} tone="green" gap={6} />
      {/* sky */}
      <Ink d="M436 110 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" order={0} tone="brass" />
      <Ink d="M470 62 V48 M470 158 V172 M422 110 H408 M518 110 H532 M436 76 L426 66 M504 76 L514 66 M436 144 L426 154 M504 144 L514 154" order={1} tone="brass" thin />
      <Ink d="M82 132 C 82 112, 112 106, 124 118 C 132 102, 164 104, 166 122 C 186 120, 192 144, 172 148 H94 C 78 148, 72 134, 82 132 Z" order={2} thin />
      <Ink d="M296 86 C 296 72, 318 68, 326 78 C 334 68, 356 70, 356 84 C 368 84, 370 98, 358 100 H302 C 290 100, 288 88, 296 86 Z" order={2} thin />
      <Ink d="M214 132 q8 -8 16 0 q8 -8 16 0 M252 112 q6 -6 12 0 q6 -6 12 0" order={3} thin />
      <Ink d="M150 262 L226 176 L262 210 L326 142 L398 222 L436 192 L512 262" order={4} thin />
      {/* hills and road */}
      <Ink d="M20 290 C 80 236, 180 228, 300 262" order={5} />
      <Ink d="M316 262 C 400 226, 520 232, 584 286" order={5} />
      <Ink d="M96 516 C 210 420, 290 330, 302 262" order={6} />
      <Ink d="M520 516 C 410 420, 330 330, 314 262" order={6} />
      <Ink d="M309 510 L308 486 M307 452 L306 432 M306 402 L306 386 M306 360 L306 348 M307 324 L307 316 M307 296 L307 291 M308 276 L308 273" order={7} tone="brass" />
      {/* milestones: where she started, where she is */}
      <Ink d="M44 472 C 42 440, 50 430, 66 430 C 82 430, 90 440, 88 472 Z" order={8} />
      <Scribble x={66} y={458} size={17} order={8}>2023</Scribble>
      <Ink d="M246 344 C 245 326, 250 320, 258 320 C 266 320, 271 326, 270 344 Z" order={9} thin />
      <Scribble x={258} y={337} size={10} order={9}>2026</Scribble>
      {/* trees */}
      <Ink d={crownL} order={10} />
      <Ink d="M150 368 V404 M150 384 L140 374" order={10} />
      <Ink d={crownR} order={11} />
      <Ink d="M482 360 V396 M482 378 L492 368" order={11} />
      <Ink d="M226 280 L214 302 H238 Z M226 302 V312" order={12} thin />
      <Ink d="M390 276 L380 296 H400 Z M390 296 V304" order={12} thin />
      {/* grass and flowers */}
      <Ink d="M40 400 l4 -10 l4 10 M110 440 l3 -9 l3 9 l3 -7 M540 430 l4 -10 l4 10 M500 480 l3 -9 l3 9 l3 -7" order={13} thin />
      <Ink d="M57 430 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M123 470 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M517 450 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M557 500 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M207 470 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" order={13} tone="brass" thin />
      {/* her, walking away from us: long brown hair with a bow, a dress, a backpack */}
      <Wash d="M338 370 C 346 364, 362 364, 370 370 L376 404 L386 440 C 370 448, 338 448, 322 440 L332 404 Z" />
      <Fill d="M338 370 C 346 364, 362 364, 370 370 L376 404 L386 440 C 370 448, 338 448, 322 440 L332 404 Z" tone="green" gap={5} />
      <Wash tone="sun" d="M342 398 H366 V426 H342 Z" />
      <Fill d="M342 398 H366 V426 H342 Z" tone="brass" style="zigzag" gap={4} />
      <Wash tone="paper" d="M339 340 C 338 322, 370 322, 369 340 C 371 356, 373 370, 377 382 C 380 392, 373 398, 367 393 C 362 400, 352 401, 347 395 C 340 400, 330 394, 333 384 C 337 370, 339 356, 339 340 Z" />
      <Wash tone="hair" d="M339 340 C 338 322, 370 322, 369 340 C 371 356, 373 370, 377 382 C 380 392, 373 398, 367 393 C 362 400, 352 401, 347 395 C 340 400, 330 394, 333 384 C 337 370, 339 356, 339 340 Z" />
      <Fill d="M339 340 C 338 322, 370 322, 369 340 C 371 356, 373 370, 377 382 C 380 392, 373 398, 367 393 C 362 400, 352 401, 347 395 C 340 400, 330 394, 333 384 C 337 370, 339 356, 339 340 Z" gap={4} angle={80} />
      <Ink d="M336 372 L332 404 L322 440 C 338 448, 370 448, 386 440 L376 404 L372 372" order={14} />
      <Ink d="M342 398 H366 V426 H342 Z M346 412 H362" order={15} tone="brass" />
      <Ink d="M339 340 C 338 322, 370 322, 369 340 C 371 356, 373 370, 377 382 C 380 392, 373 398, 367 393 C 362 400, 352 401, 347 395 C 340 400, 330 394, 333 384 C 337 370, 339 356, 339 340 Z" order={16} />
      <Ink d="M354 326 C 352 346, 348 370, 346 390 M354 326 C 358 346, 362 368, 364 388" order={16} thin />
      <Ink d="M354 330 L345 324 L345 336 Z M354 330 L363 324 L363 336 Z" order={17} tone="brass" />
      <Ink d="M337 376 C 328 390, 324 404, 324 418 M371 376 C 381 388, 387 400, 391 412" order={18} />
      <Ink d="M324 422 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M392 416 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" order={18} thin />
      <Ink d="M344 444 L340 466 L336 482 M364 444 L370 462 L378 478" order={19} />
      <Ink d="M328 486 C 330 480, 340 480, 342 486 Z M374 482 C 378 476, 388 478, 388 484 Z" order={20} />
      <Ink d="M312 492 C 336 496, 372 494, 400 484" order={20} thin />
    </>
  )
}

/* ---------- Bölüm 1 · Temeller: a lit bulb, turning gears, a notebook of first results ---------- */
function Curiosity({ w }: { w: DrawingWords }) {
  const bulb = 'M300 50 C 254 50, 228 88, 236 124 C 242 152, 266 166, 270 194 H330 C 334 166, 358 152, 364 124 C 372 88, 346 50, 300 50 Z'
  const book = 'M110 456 C 196 434, 258 436, 300 452 C 342 436, 404 434, 490 456 L490 324 C 404 304, 342 306, 300 324 C 258 306, 196 304, 110 324 Z'
  return (
    <>
      <Fill d="M182 122 a118 118 0 1 0 236 0 a118 118 0 1 0 -236 0" tone="brass" style="dots" gap={13} />
      <Wash tone="sun" d={bulb} />
      <Fill d={bulb} tone="brass" gap={6} />
      <Wash d="M110 456 C 196 434, 258 436, 300 452 L300 324 C 258 306, 196 304, 110 324 Z" />
      <Wash tone="sky" d="M40 398 V446 Q40 456 50 456 H86 Q96 456 96 446 V398 Z" />
      <Fill d="M40 398 V446 Q40 456 50 456 H86 Q96 456 96 446 V398 Z" tone="sky" style="cross-hatch" gap={6} />
      <Fill d="M478.0 170.0 L485.8 173.8 L484.5 180.1 L475.8 180.5 L473.0 185.3 L477.1 193.0 L472.3 197.3 L465.1 192.5 L460.0 194.7 L458.8 203.3 L452.4 204.0 L449.4 195.9 L444.0 194.7 L437.9 200.9 L432.4 197.8 L434.7 189.4 L431.0 185.3 L422.4 186.8 L419.8 180.9 L426.6 175.5 L426.0 170.0 L418.2 166.2 L419.5 159.9 L428.2 159.5 L431.0 154.7 L426.9 147.0 L431.7 142.7 L438.9 147.5 L444.0 145.3 L445.2 136.7 L451.6 136.0 L454.6 144.1 L460.0 145.3 L466.1 139.1 L471.6 142.2 L469.3 150.6 L473.0 154.7 L481.6 153.2 L484.2 159.1 L477.4 164.5 Z" tone="green" gap={5} />
      <Fill d="M516.0 222.0 L521.8 225.1 L520.5 230.1 L513.9 229.9 L511.3 233.3 L513.2 239.6 L508.7 242.2 L504.2 237.4 L500.0 238.0 L496.9 243.8 L491.9 242.5 L492.1 235.9 L488.7 233.3 L482.4 235.2 L479.8 230.7 L484.6 226.2 L484.0 222.0 L478.2 218.9 L479.5 213.9 L486.1 214.1 L488.7 210.7 L486.8 204.4 L491.3 201.8 L495.8 206.6 L500.0 206.0 L503.1 200.2 L508.1 201.5 L507.9 208.1 L511.3 210.7 L517.6 208.8 L520.2 213.3 L515.4 217.8 Z" tone="sky" gap={5} angle={40} />
      <Ink d={GROUND} thin />
      {/* bulb */}
      <Ink d={bulb} order={0} />
      <Ink d="M272 206 H328 M276 220 H324 M286 234 H314" order={1} />
      <Ink d="M286 192 L290 150 C 292 134, 308 134, 310 150 L314 192 M294 150 C 298 160, 302 160, 306 150" order={2} tone="brass" />
      <Ink d="M300 24 V8 M232 54 L218 40 M368 54 L382 40 M206 120 H186 M394 120 H414" order={3} tone="brass" thin />
      {/* gears */}
      <Ink d="M478.0 170.0 L485.8 173.8 L484.5 180.1 L475.8 180.5 L473.0 185.3 L477.1 193.0 L472.3 197.3 L465.1 192.5 L460.0 194.7 L458.8 203.3 L452.4 204.0 L449.4 195.9 L444.0 194.7 L437.9 200.9 L432.4 197.8 L434.7 189.4 L431.0 185.3 L422.4 186.8 L419.8 180.9 L426.6 175.5 L426.0 170.0 L418.2 166.2 L419.5 159.9 L428.2 159.5 L431.0 154.7 L426.9 147.0 L431.7 142.7 L438.9 147.5 L444.0 145.3 L445.2 136.7 L451.6 136.0 L454.6 144.1 L460.0 145.3 L466.1 139.1 L471.6 142.2 L469.3 150.6 L473.0 154.7 L481.6 153.2 L484.2 159.1 L477.4 164.5 Z" order={4} />
      <Ink d="M443 170 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0" order={4} thin />
      <Ink d="M516.0 222.0 L521.8 225.1 L520.5 230.1 L513.9 229.9 L511.3 233.3 L513.2 239.6 L508.7 242.2 L504.2 237.4 L500.0 238.0 L496.9 243.8 L491.9 242.5 L492.1 235.9 L488.7 233.3 L482.4 235.2 L479.8 230.7 L484.6 226.2 L484.0 222.0 L478.2 218.9 L479.5 213.9 L486.1 214.1 L488.7 210.7 L486.8 204.4 L491.3 201.8 L495.8 206.6 L500.0 206.0 L503.1 200.2 L508.1 201.5 L507.9 208.1 L511.3 210.7 L517.6 208.8 L520.2 213.3 L515.4 217.8 Z" order={5} />
      <Ink d="M494 222 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" order={5} thin />
      {/* handwriting around the idea */}
      <Scribble x={150} y={110} size={44} tone="brass" rotate={-8} order={6}>?</Scribble>
      <Scribble x={458} y={92} size={38} rotate={6} order={7}>{'{ }'}</Scribble>
      <Scribble x={170} y={232} size={28} rotate={-4} order={8}>import</Scribble>
      <Scribble x={444} y={236} size={28} tone="brass" rotate={5} order={9}>{w.data}</Scribble>
      {/* open notebook */}
      <Ink d={book} order={10} />
      <Ink d="M300 324 V452" order={11} thin />
      <Ink d="M146 424 V346 M146 424 H272" order={12} thin />
      <Ink d="M163 404 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M181 396 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M197 384 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M213 382 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M231 366 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M249 360 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" order={13} />
      <Ink d="M156 414 L264 352" order={14} tone="brass" />
      <Ink d="M326 350 H424 M342 368 H452 M342 386 H412 M326 404 H440 M342 422 H398" order={15} thin />
      {/* mug and pencil on the desk */}
      <Ink d="M40 398 V446 Q40 456 50 456 H86 Q96 456 96 446 V398 Z" order={16} />
      <Ink d="M96 410 C 114 410, 114 436, 96 436" order={16} />
      <Ink d="M56 384 C 50 372, 64 366, 58 352 M76 384 C 70 372, 84 366, 78 352" order={17} thin />
      <Ink d="M432 472 L548 450 L552 460 L436 482 Z M432 472 L420 480 L436 482" order={18} tone="brass" />
    </>
  )
}

/* ---------- Bölüm 2 · Gelişim: a sprint board, notes moving to done ---------- */
function Order({ w }: { w: DrawingWords }) {
  const notes = {
    a: 'M96 156 L160 152 L164 208 L100 212 Z',
    b: 'M98 236 L158 240 L156 296 L96 292 Z',
    c: 'M256 160 L322 164 L318 220 L252 216 Z',
    d: 'M412 158 L474 154 L476 210 L414 212 Z',
    e: 'M414 300 L476 304 L472 360 L412 356 Z',
    f: 'M352 236 L412 224 L424 278 L364 290 Z',
  }
  return (
    <>
      <Wash tone="sun" d={notes.a} />
      <Wash tone="sky" d={notes.b} />
      <Wash d={notes.c} />
      <Wash d={notes.d} />
      <Wash tone="sky" d={notes.e} />
      <Wash tone="sun" d={notes.f} />
      <Fill d={notes.f} tone="brass" gap={6} />
      <Fill d="M60 80 H540 V130 H60 Z" style="hachure" gap={9} angle={60} />
      <Wash tone="sky" d="M452 410 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0" />
      <Fill d="M452 410 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0" tone="sky" gap={7} angle={30} />
      <Ink d={GROUND} thin />
      <Scribble x={112} y={62} size={24} tone="brass" rotate={-3} order={0}>Sprint 1</Scribble>
      {/* the board */}
      <Ink d="M60 80 H540 V420 H60 Z" order={1} />
      <Ink d="M60 130 H540 M220 80 V420 M380 80 V420" order={2} thin />
      <Ink d="M120 420 L104 470 M430 420 L446 470" order={2} />
      <Scribble x={140} y={114} size={24} order={3}>{w.todo}</Scribble>
      <Scribble x={300} y={114} size={24} order={3}>{w.doing}</Scribble>
      <Scribble x={460} y={114} size={24} order={3}>{w.done}</Scribble>
      {/* sticky notes */}
      <Ink d={notes.a} order={4} thin />
      <Ink d="M108 172 H150 M108 186 H140" order={4} thin />
      <Ink d={notes.b} order={5} thin />
      <Ink d="M108 256 H146 M108 270 H136" order={5} thin />
      <Ink d={notes.c} order={6} thin />
      <Ink d="M266 180 H308 M266 194 H296" order={6} thin />
      <Ink d={notes.f} order={7} />
      <Ink d="M318 262 C 326 252, 336 250, 344 252 M322 278 C 330 270, 338 270, 346 272" order={7} thin />
      <Ink d={notes.d} order={8} thin />
      <Ink d="M426 182 l10 10 l22 -24" order={8} tone="brass" />
      <Ink d={notes.e} order={9} thin />
      <Ink d="M428 326 l10 10 l22 -24" order={9} tone="brass" />
      {/* checking the work */}
      <Ink d="M452 410 a48 48 0 1 0 96 0 a48 48 0 1 0 -96 0" order={10} />
      <Ink d="M538 444 L578 486" order={11} />
      <Ink d="M546 438 L586 480" order={11} thin />
    </>
  )
}

/* ---------- Bölüm 3 · Üretim: a paper sketch becomes a working product ---------- */
function Product({ w }: { w: DrawingWords }) {
  const paper = 'M58 150 L212 136 L226 324 L72 338 Z'
  const screen = 'M302 202 L546 199 L548 366 L300 368 Z'
  const cap = 'M466 158 L536 134 L592 166 L522 190 Z'
  return (
    <>
      <Wash tone="sun" d={paper} />
      <Fill d="M88 214 L196 206 L200 262 L92 270 Z" style="dashed" gap={8} />
      <Wash d={screen} />
      <Fill d="M262 382 L578 380 L594 410 L246 412 Z" gap={6} />
      <Fill d="M330 296 H500 V308 H330 Z M330 322 H468 V334 H330 Z M330 348 H516 V360 H330 Z" tone="brass" gap={4} />
      <Fill d={cap} style="cross-hatch" gap={5} />
      <Ink d={GROUND} thin />
      {/* the sketch on paper, pinned */}
      <Ink d={paper} order={0} />
      <Ink d="M128 150 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" order={0} tone="brass" />
      <Ink d="M82 166 L198 156 L200 182 L84 192 Z" order={1} thin />
      <Ink d="M88 214 L196 206 L200 262 L92 270 Z M88 214 L200 262 M196 206 L92 270" order={2} thin />
      <Ink d="M96 292 H170 M98 308 H150" order={3} thin />
      <Scribble x={142} y={372} size={30} tone="brass" rotate={-4} order={4}>{w.idea}</Scribble>
      {/* the arrow from idea to product */}
      <Ink d="M178 392 C 214 456, 262 452, 284 414" order={5} tone="brass" />
      <Ink d="M272 418 L284 414 L288 428" order={5} tone="brass" />
      {/* laptop with the product on screen */}
      <Ink d="M288 188 L560 184 L564 380 L286 382 Z" order={6} />
      <Ink d={screen} order={7} thin />
      <Ink d="M262 382 L578 380 L594 410 L246 412 Z" order={8} />
      <Ink d="M322 246 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0 M336 240 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0 M330 260 C 334 252, 350 252, 354 260" order={9} />
      <Ink d="M370 236 H460 M370 254 H430" order={9} thin />
      <Ink d="M330 296 H516 V308 H330 Z M330 322 H516 V334 H330 Z M330 348 H516 V360 H330 Z" order={10} thin />
      <Scribble x={420} y={452} size={30} tone="brass" rotate={3} order={11}>{w.product}</Scribble>
      {/* graduation cap resting on the screen, sparkles */}
      <Ink d={cap} order={12} />
      <Ink d="M498 176 V200 C 524 212, 556 206, 572 192 V172" order={13} />
      <Ink d="M536 162 L566 178 V206 M560 206 H572 L566 220 Z" order={14} tone="brass" />
      <Ink d="M450 111 Q450 120 459 120 Q450 120 450 129 Q450 120 441 120 Q450 120 450 111 Z M586 105 Q586 112 593 112 Q586 112 586 119 Q586 112 579 112 Q586 112 586 105 Z M246 152 Q246 160 254 160 Q246 160 246 168 Q246 160 238 160 Q246 160 246 152 Z" order={15} tone="brass" thin />
    </>
  )
}

/* ---------- Bölüm 4 · Bugün: she carries the need across the bridge to a solution ---------- */
function Bridge({ w }: { w: DrawingWords }) {
  const deck = 'M190 402 Q 293 302 396 402 L396 410 Q 293 314 190 410 Z'
  const water = 'M186 434 C 236 424, 330 444, 388 434 L388 470 L186 470 Z'
  return (
    <>
      <Wash tone="sky" d={water} />
      <Fill d={water} tone="sky" style="zigzag-line" gap={9} angle={0} />
      <Wash d="M60 470 V232 H190 V470 Z" />
      <Fill d="M60 470 V232 H190 V470 Z" tone="green" gap={9} />
      <Wash tone="sun" d="M78 296 h22 v20 h-22 z M150 256 h22 v20 h-22 z M114 336 h22 v20 h-22 z" />
      <Fill d={deck} tone="brass" style="cross-hatch" gap={5} />
      <Wash tone="sun" d="M150 120 H286 Q298 120 298 132 V176 Q298 188 286 188 H198 L176 208 L180 188 H150 Q138 188 138 176 V132 Q138 120 150 120 Z" />
      <Wash d="M330 176 H458 Q470 176 470 188 V228 Q470 240 458 240 H434 L438 262 L412 240 H330 Q318 240 318 228 V188 Q318 176 330 176 Z" />
      <Wash d="M424 344 L548 342 L550 422 L422 424 Z" />
      <Ink d={GROUND} thin />
      {/* the business: an office */}
      <Ink d="M60 470 V232 H190 V470 M50 232 H200" order={0} />
      <Ink d="M78 256 h22 v20 h-22 z M114 256 h22 v20 h-22 z M150 256 h22 v20 h-22 z M78 296 h22 v20 h-22 z M114 296 h22 v20 h-22 z M150 296 h22 v20 h-22 z M78 336 h22 v20 h-22 z M114 336 h22 v20 h-22 z M150 336 h22 v20 h-22 z" order={1} thin />
      <Ink d="M108 470 V426 H142 V470" order={2} />
      {/* the software: a laptop with an agent on screen */}
      <Ink d="M412 332 L560 330 L562 432 L410 434 Z" order={3} />
      <Ink d="M424 344 L548 342 L550 422 L422 424 Z" order={4} thin />
      <Ink d="M396 434 L576 432 L590 454 L382 456 Z" order={5} />
      <Ink d="M466 362 H506 Q514 362 514 370 V396 Q514 404 506 404 H466 Q458 404 458 396 V370 Q458 362 466 362 Z M486 362 V350 M486 346 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0" order={6} />
      <Ink d="M474 380 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M498 380 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M476 394 Q486 400 496 394" order={7} thin />
      {/* the bridge and the river under it */}
      <Ink d="M190 402 Q 293 302 396 402 M190 410 Q 293 314 396 410" order={8} />
      <Ink d="M218 380 V430 M256 356 V438 M293 352 V440 M330 356 V438 M368 380 V430" order={9} thin />
      <Ink d="M186 434 C 236 424, 330 444, 388 434" order={9} tone="sky" thin />
      {/* her on the bridge, carrying a file */}
      <Ink d="M293 290 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" order={10} />
      <Ink d="M286 304 C 284 314, 284 330, 286 342 H300 C 302 330, 302 314, 300 304 Z" order={11} />
      <Ink d="M288 342 L284 356 M298 342 L304 354" order={12} />
      <Ink d="M300 310 L314 318 M286 310 L278 322" order={12} />
      <Ink d="M312 306 h18 v22 h-18 z M312 312 h7 l3 -4 h8" order={13} tone="brass" />
      {/* the need and the answer */}
      <Ink d="M150 120 H286 Q298 120 298 132 V176 Q298 188 286 188 H198 L176 208 L180 188 H150 Q138 188 138 176 V132 Q138 120 150 120 Z" order={14} />
      <Scribble x={218} y={164} size={28} order={15}>{w.need}</Scribble>
      <Ink d="M330 176 H458 Q470 176 470 188 V228 Q470 240 458 240 H434 L438 262 L412 240 H330 Q318 240 318 228 V188 Q318 176 330 176 Z" order={16} />
      <Scribble x={380} y={220} size={28} order={17}>{w.solution}</Scribble>
      <Ink d="M426 206 l8 8 l18 -20" order={18} tone="brass" />
    </>
  )
}

/* ---------- Bölüm 5 · Müzik: a bağlama in the spotlight, a choir behind, music in the air ---------- */
function Music() {
  const body = 'M200 300 C 150 310, 130 360, 140 400 C 150 440, 190 462, 222 452 C 262 438, 270 390, 252 350 C 240 320, 225 300, 200 300 Z'
  const light = 'M270 0 L120 470 L460 470 L330 0 Z'
  return (
    <>
      <Fill d={light} tone="brass" style="dots" gap={14} />
      <Wash tone="sun" d={body} />
      <Fill d={body} tone="brass" gap={6} />
      <Wash d="M360 200 L500 200 L492 300 L368 300 Z" />
      <Fill d="M20 470 H580 V506 H20 Z" gap={10} angle={-60} />
      <Wash d="M26 284 C 26 244, 32 230, 44 230 C 56 230, 62 244, 62 284 Z M64 276 C 64 236, 70 222, 82 222 C 94 222, 100 236, 100 276 Z M102 284 C 102 244, 108 230, 120 230 C 132 230, 138 244, 138 284 Z" />
      <Wash tone="sun" d="M52 470 C 48 440, 58 414, 78 412 C 98 414, 108 440, 104 470 Z M61 398 a17 17 0 1 0 34 0 a17 17 0 1 0 -34 0 M63 390 L60 370 L74 383 M92 383 L96 370 L93 390" />
      <Fill d="M52 470 C 48 440, 58 414, 78 412 C 98 414, 108 440, 104 470 Z" tone="brass" gap={6} angle={0} />
      <Wash d="M518 368 C 500 358, 498 340, 512 334 C 526 344, 526 360, 518 368 Z M578 372 C 594 362, 596 346, 584 340 C 572 350, 570 364, 578 372 Z M548 342 C 536 328, 538 310, 548 302 C 558 310, 560 328, 548 342 Z" />
      <Fill d="M518 368 C 500 358, 498 340, 512 334 C 526 344, 526 360, 518 368 Z M578 372 C 594 362, 596 346, 584 340 C 572 350, 570 364, 578 372 Z M548 342 C 536 328, 538 310, 548 302 C 558 310, 560 328, 548 342 Z" tone="green" gap={5} angle={50} />
      <Wash tone="sky" d="M524 470 L530 430 H566 L572 470 Z M312 470 L316 446 H344 L348 470 Z" />
      <Wash tone="sun" d="M308 404 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M313.5 404 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0 M321 396 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M327.5 396 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0 M338 406 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M343.5 406 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0" />
      <Fill d="M26 284 C 26 244, 32 230, 44 230 C 56 230, 62 244, 62 284 Z M64 276 C 64 236, 70 222, 82 222 C 94 222, 100 236, 100 276 Z M102 284 C 102 244, 108 230, 120 230 C 132 230, 138 244, 138 284 Z" tone="green" gap={6} />
      <Ink d="M20 470 H580 M20 506 H580" order={0} thin />
      {/* the choir, small, behind */}
      <Ink d="M32 214 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M70 206 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M108 214 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" order={1} thin />
      <Ink d="M26 284 C 26 244, 32 230, 44 230 C 56 230, 62 244, 62 284 Z M64 276 C 64 236, 70 222, 82 222 C 94 222, 100 236, 100 276 Z M102 284 C 102 244, 108 230, 120 230 C 132 230, 138 244, 138 284 Z" order={1} thin />
      <Ink d="M41 218 a3 2.6 0 1 0 6 0 a3 2.6 0 1 0 -6 0 M79 210 a3 2.6 0 1 0 6 0 a3 2.6 0 1 0 -6 0 M117 218 a3 2.6 0 1 0 6 0 a3 2.6 0 1 0 -6 0 M30 196 q4 -4 8 0 M130 190 q4 -4 8 0" order={2} thin />
      {/* bağlama */}
      <Ink d={body} order={3} />
      <Ink d="M196 304 L290 72 M212 308 L304 78" order={4} />
      <Ink d="M290 72 L304 78 L314 48 L300 42 Z" order={5} />
      <Ink d="M296 56 L284 52 M298 66 L286 62 M308 50 L320 54 M306 62 L318 66" order={6} thin />
      <Ink d="M211 268 L225 274 M222 241 L236 247 M232 215 L246 221 M242 192 L256 198 M250 171 L264 177 M257 153 L271 159 M264 137 L278 143" order={7} thin />
      <Ink d="M202 306 L196 440 M208 307 L204 442" order={8} thin />
      <Ink d="M196 392 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0" order={9} />
      <Ink d="M184 444 H214" order={9} tone="brass" />
      {/* music stand */}
      <Ink d="M430 440 L400 470 M430 440 L460 470 M430 440 V470 M430 440 V300" order={10} />
      <Ink d="M360 200 L500 200 L492 300 L368 300 Z M360 304 H500" order={11} />
      <Ink d="M378 220 H484 M378 228 H484 M378 236 H484 M378 244 H484 M378 252 H484 M380 266 H482 M380 274 H482 M380 282 H482 M380 290 H482" order={12} thin />
      {/* a ribbon of staff lines rising from the bağlama, notes riding on it */}
      <Ink d="M318 70 C 380 10, 470 120, 580 50 M318 76 C 380 16, 470 126, 580 56 M318 82 C 380 22, 470 132, 580 62 M318 88 C 380 28, 470 138, 580 68 M318 94 C 380 34, 470 144, 580 74" order={13} tone="brass" thin />
      <Ink d="M366 74 a6 4.6 0 1 0 12 0 a6 4.6 0 1 0 -12 0 M378 74 V44 M424 92 a6 4.6 0 1 0 12 0 a6 4.6 0 1 0 -12 0 M436 92 V62 M482 92 a6 4.6 0 1 0 12 0 a6 4.6 0 1 0 -12 0 M494 92 V62 M538 70 a6 4.6 0 1 0 12 0 a6 4.6 0 1 0 -12 0 M550 70 V40 M494 62 L550 40" order={14} tone="brass" />
      <Ink d="M140 112 Q140 120 148 120 Q140 120 140 128 Q140 120 132 120 Q140 120 140 112 Z M560 143 Q560 150 567 150 Q560 150 560 157 Q560 150 553 150 Q560 150 560 143 Z M340 24 Q340 30 346 30 Q340 30 340 36 Q340 30 334 30 Q340 30 340 24 Z" order={15} tone="brass" thin />
      {/* a ginger cat, a potted plant and a pot of flowers on the stage */}
      <Ink d="M52 470 C 48 440, 58 414, 78 412 C 98 414, 108 440, 104 470 Z M61 398 a17 17 0 1 0 34 0 a17 17 0 1 0 -34 0 M63 390 L60 370 L74 383 M92 383 L96 370 L93 390" order={16} />
      <Ink d="M69 397 q3 -3 6 0 M81 397 q3 -3 6 0 M76 404 l2 2 l2 -2 M78 406 q-3 3 -6 1 M78 406 q3 3 6 1 M62 404 H50 M62 408 L50 411 M94 404 H106 M94 408 L106 411" order={17} thin />
      <Ink d="M104 466 C 126 466, 130 444, 118 436" order={17} />
      <Ink d="M78 352 c -4 -6 -12 -2 -8 4 l8 8 l8 -8 c4 -6 -4 -10 -8 -4 Z" order={18} tone="brass" thin />
      <Ink d="M524 470 L530 430 H566 L572 470 Z" order={16} />
      <Ink d="M548 430 C 546 400, 530 380, 518 368 M548 430 C 552 396, 566 380, 578 372 M548 430 C 548 400, 550 370, 548 342" order={17} tone="green" thin />
      <Ink d="M518 368 C 500 358, 498 340, 512 334 C 526 344, 526 360, 518 368 Z M578 372 C 594 362, 596 346, 584 340 C 572 350, 570 364, 578 372 Z M548 342 C 536 328, 538 310, 548 302 C 558 310, 560 328, 548 342 Z" order={18} tone="green" />
      <Ink d="M312 470 L316 446 H344 L348 470 Z" order={16} />
      <Ink d="M324 446 C 322 430, 318 420, 316 412 M330 446 V404 M336 446 C 338 430, 342 420, 346 414 M330 428 C 322 424, 318 426, 316 430 M330 420 C 338 416, 342 418, 344 422" order={17} tone="green" thin />
      <Ink d="M308 404 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M313.5 404 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0 M321 396 a9 9 0 1 0 18 0 a9 9 0 1 0 -18 0 M327.5 396 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0 M338 406 a8 8 0 1 0 16 0 a8 8 0 1 0 -16 0 M343.5 406 a2.5 2.5 0 1 0 5.0 0 a2.5 2.5 0 1 0 -5.0 0" order={18} tone="brass" />
    </>
  )
}

const DRAWINGS: Record<SceneId, (props: { w: DrawingWords }) => JSX.Element> = {
  cover: Cover,
  curiosity: Curiosity,
  order: Order,
  product: Product,
  bridge: Bridge,
  music: Music,
}

export function SceneDrawing({ id, active, words }: { id: SceneId; active: boolean; words: DrawingWords }) {
  const Drawing = DRAWINGS[id]
  return (
    <svg
      className={active ? 'scene is-active' : 'scene'}
      viewBox="0 0 600 520"
      role="img"
      aria-label={words.labels[id]}
      aria-hidden={!active}
    >
      <Drawing w={words} />
    </svg>
  )
}
