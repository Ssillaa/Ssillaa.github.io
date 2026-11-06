import type { CSSProperties, JSX } from 'react'

import type { SceneId } from '../data'

/*
 * Pencil drawings (HIKAYE-PLANI.md, K4).
 *
 * Every line is drawn twice: a firm stroke and a fainter, slightly offset
 * second pass, the way a pencil goes over a line again. A displacement
 * filter makes both wobble like a hand-drawn line, and `pathLength={1}`
 * lets CSS draw every line in the same way, whatever its length; `order`
 * staggers the lines of a scene.
 */
function Ink({ d, order = 0, brass = false, thin = false }: { d: string; order?: number; brass?: boolean; thin?: boolean }) {
  const style = { '--i': order } as CSSProperties
  const cls = brass ? 'ink ink--brass' : 'ink'
  return (
    <>
      <path className={cls} d={d} pathLength={1} strokeWidth={thin ? 1.7 : 2.6} style={style} />
      <path className={`${cls} ink--ghost`} d={d} pathLength={1} strokeWidth={thin ? 0.9 : 1.3} style={style} transform="translate(1.4 1)" />
    </>
  )
}

/** Pencil shading: a patch of diagonal hatching that fades in after the lines. */
function Hatch({ d, scene, brass = false }: { d: string; scene: SceneId; brass?: boolean }) {
  return <path className="hatch" d={d} fill={`url(#hatch-${brass ? 'brass' : 'ink'}-${scene})`} />
}

/** A light wash of colour under the lines, like watercolour on a sketch. */
function Wash({ d, tone = 'green' }: { d: string; tone?: 'green' | 'sun' }) {
  return <path className={`wash wash--${tone}`} d={d} />
}

function Defs({ id }: { id: SceneId }) {
  return (
    <defs>
      <filter id={`pencil-${id}`} x="-5%" y="-5%" width="110%" height="110%">
        <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3.2" xChannelSelector="R" yChannelSelector="G" />
      </filter>
      <pattern id={`hatch-ink-${id}`} width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
        <line x1="0" y1="0" x2="0" y2="7" stroke="#1E3B33" strokeWidth="1.1" opacity="0.55" />
      </pattern>
      <pattern id={`hatch-brass-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-38)">
        <line x1="0" y1="0" x2="0" y2="6" stroke="#B88A3E" strokeWidth="1.3" opacity="0.7" />
      </pattern>
    </defs>
  )
}

const GROUND = 'M30 470 C 170 466, 420 474, 570 468'

/* ---------- Kapak: walking down a long road towards the horizon ---------- */
function Cover() {
  const s: SceneId = 'cover'
  return (
    <>
      {/* colour first, so the lines sit on top */}
      <Wash tone="sun" d="M432 150 m-36 0 a36 36 0 1 0 72 0 a36 36 0 1 0 -72 0" />
      <Wash d="M24 262 C 70 214, 150 196, 214 214 C 252 226, 278 240, 298 254 Z" />
      <Wash d="M316 254 C 360 220, 430 196, 500 204 C 540 210, 566 230, 580 250 Z" />
      <Wash d="M170 318 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0 M246 278 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0 M462 330 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" />
      <Wash d="M335 370 C 333 384, 332 404, 334 422 H374 C 376 404, 375 384, 371 370 C 362 364, 344 364, 335 370 Z" />
      <Wash tone="sun" d="M342 380 H366 V410 H342 Z" />

      {/* sun, birds and hills on the horizon */}
      <Ink d="M432 150 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" order={0} brass />
      <Ink d="M432 98 V84 M380 150 H366 M484 150 H498 M396 114 L386 104 M468 114 L478 104" order={1} brass thin />
      <Ink d="M178 128 q8 -8 16 0 q8 -8 16 0 M222 104 q6 -6 12 0 q6 -6 12 0" order={2} thin />
      <Ink d="M24 262 C 70 214, 150 196, 214 214 C 252 226, 278 240, 298 254" order={3} />
      <Ink d="M316 254 C 360 220, 430 196, 500 204 C 540 210, 566 230, 580 250" order={3} />
      <Ink d="M20 262 C 160 256, 440 256, 584 252" order={4} thin />
      {/* the long road, narrowing to the horizon */}
      <Ink d="M96 516 C 210 420, 290 330, 302 254" order={5} />
      <Ink d="M520 516 C 410 420, 330 330, 314 254" order={5} />
      <Ink d="M309 506 L308 482 M307 448 L306 428 M306 398 L306 382 M306 356 L306 344 M307 320 L307 312 M307 292 L307 287 M308 272 L308 269" order={6} brass />
      {/* trees along the way */}
      <Ink d="M170 318 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0 M170 340 V372" order={7} />
      <Ink d="M246 278 m-12 0 a12 12 0 1 0 24 0 a12 12 0 1 0 -24 0 M246 290 V306" order={8} thin />
      <Ink d="M462 330 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0 M462 350 V380" order={9} />
      {/* her, walking away from us with a backpack */}
      <Hatch scene={s} d="M354 350 m-13 0 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" />
      <Ink d="M354 350 m-13 0 a13 13 0 1 0 26 0 a13 13 0 1 0 -26 0" order={10} />
      <Ink d="M347 338 C 352 332, 360 333, 363 340 M364 344 C 374 348, 374 362, 366 368" order={10} thin />
      <Ink d="M335 370 C 333 384, 332 404, 334 422 H374 C 376 404, 375 384, 371 370 C 362 364, 344 364, 335 370 Z" order={11} />
      <Ink d="M342 380 H366 V410 H342 Z M346 380 C 346 372, 362 372, 362 380" order={12} brass />
      <Ink d="M335 374 C 326 388, 322 400, 320 414 M371 374 C 380 388, 386 398, 390 410" order={13} />
      <Ink d="M344 422 L338 452 L330 478 M364 422 L370 450 L380 472" order={14} />
      <Ink d="M322 480 H336 M376 472 L390 476" order={15} />
      <Ink d="M312 488 C 336 492, 372 490, 398 480" order={16} thin />
    </>
  )
}

/* ---------- Bölüm 1 · Merak: a lit bulb over a notebook of first results ---------- */
function Curiosity() {
  const s: SceneId = 'curiosity'
  return (
    <>
      <Wash tone="sun" d="M300 66 C 250 66, 222 106, 230 146 C 236 176, 262 192, 266 222 H334 C 338 192, 364 176, 370 146 C 378 106, 350 66, 300 66 Z" />
      <Wash d="M110 456 C 196 434, 258 436, 300 452 L300 324 C 258 306, 196 304, 110 324 Z" />
      <Hatch scene={s} brass d="M262 108 C 270 92, 330 92, 338 108 C 346 124, 330 170, 318 196 H282 C 270 170, 254 124, 262 108 Z" />
      <Ink d="M300 66 C 250 66, 222 106, 230 146 C 236 176, 262 192, 266 222 H334 C 338 192, 364 176, 370 146 C 378 106, 350 66, 300 66 Z" order={0} />
      <Ink d="M268 234 H332 M272 248 H328 M282 262 H318" order={1} />
      <Ink d="M284 220 L288 176 C 290 158, 310 158, 312 176 L316 220 M292 176 C 296 186, 304 186, 308 176" order={2} brass />
      <Ink d="M300 40 V16 M228 70 L212 54 M372 70 L388 54 M204 138 H180 M396 138 H420" order={3} brass />
      {/* open notebook */}
      <Ink d="M110 456 C 196 434, 258 436, 300 452 C 342 436, 404 434, 490 456 L490 324 C 404 304, 342 306, 300 324 C 258 306, 196 304, 110 324 Z" order={4} />
      <Ink d="M300 324 V452" order={5} thin />
      {/* left page: a first scatter plot with its trend line */}
      <Ink d="M146 424 V346 M146 424 H272" order={6} thin />
      <Ink d="M166 404 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M184 396 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M200 384 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M216 382 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M234 366 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0 M252 360 m-3 0 a3 3 0 1 0 6 0 a3 3 0 1 0 -6 0" order={7} />
      <Ink d="M156 414 L264 352" order={8} brass />
      {/* right page: first lines of Python */}
      <Ink d="M326 350 H424 M342 368 H452 M342 386 H412 M326 404 H440 M342 422 H398" order={9} thin />
      <Ink d={GROUND} thin />
    </>
  )
}

/* ---------- Bölüm 2 · Düzen: a checklist and a magnifying glass ---------- */
function Order() {
  const s: SceneId = 'order'
  return (
    <>
      <Wash d="M170 92 H398 Q412 92 412 106 V448 Q412 462 398 462 H170 Q156 462 156 448 V106 Q156 92 170 92 Z" />
      <Wash tone="sun" d="M482 372 A 52 52 0 1 0 378 372 A 52 52 0 1 0 482 372" />
      <Ink d={GROUND} thin />
      <Ink d="M170 92 H398 Q412 92 412 106 V448 Q412 462 398 462 H170 Q156 462 156 448 V106 Q156 92 170 92 Z" order={0} />
      <Ink d="M238 74 H330 Q340 74 340 84 V110 H228 V84 Q228 74 238 74 Z" order={1} />
      <Hatch scene={s} d="M238 74 H330 Q340 74 340 84 V110 H228 V84 Q228 74 238 74 Z" />
      <Ink d="M284 88 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" order={1} thin />
      <Ink d="M188 148 h26 v26 h-26 z M188 214 h26 v26 h-26 z M188 280 h26 v26 h-26 z M188 346 h26 v26 h-26 z" order={2} />
      <Ink d="M193 161 l7 7 l16 -18 M193 227 l7 7 l16 -18" order={3} />
      <Ink d="M193 293 l7 7 l16 -18" order={4} brass />
      <Ink d="M232 161 H380 M232 227 H358 M232 293 H372 M232 359 H336" order={5} thin />
      <Ink d="M232 404 H300 M232 420 H272" order={6} thin />
      {/* magnifying glass checking the work */}
      <Ink d="M482 372 A 52 52 0 1 0 378 372 A 52 52 0 1 0 482 372" order={7} />
      <Ink d="M468 410 L534 476" order={8} />
      <Ink d="M474 404 L540 470" order={8} thin />
      <Ink d="M406 372 l16 16 l30 -34" order={9} brass />
    </>
  )
}

/* ---------- Bölüm 3 · Kendi ürünüm: TalentAgent on a laptop, and a graduation cap ---------- */
function Product() {
  const s: SceneId = 'product'
  return (
    <>
      <Wash d="M116 192 L404 189 L406 368 L114 370 Z" />
      <Wash tone="sun" d="M432 120 L522 90 L594 132 L502 164 Z" />
      <Ink d={GROUND} thin />
      {/* laptop */}
      <Ink d="M100 176 L420 172 L424 384 L98 386 Z" order={0} />
      <Ink d="M116 192 L404 189 L406 368 L114 370 Z" order={1} thin />
      <Ink d="M78 386 L446 384 L478 418 L48 420 Z" order={2} />
      <Hatch scene={s} d="M78 386 L446 384 L478 418 L48 420 Z" />
      {/* candidate card on screen */}
      <Ink d="M170 236 m-22 0 a22 22 0 1 0 44 0 a22 22 0 1 0 -44 0" order={3} />
      <Ink d="M170 230 m-7 0 a7 7 0 1 0 14 0 a7 7 0 1 0 -14 0 M156 252 C 160 242, 180 242, 184 252" order={4} thin />
      <Ink d="M206 226 H300 M206 246 H262" order={5} thin />
      <Ink d="M142 292 H190 M142 322 H180 M142 352 H196" order={6} thin />
      <Ink d="M210 286 H382 V298 H210 Z M210 316 H382 V328 H210 Z M210 346 H382 V358 H210 Z" order={7} />
      <Hatch scene={s} brass d="M210 286 H350 V298 H210 Z M210 316 H318 V328 H210 Z M210 346 H366 V358 H210 Z" />
      {/* graduation cap */}
      <Ink d="M432 120 L522 90 L594 132 L502 164 Z" order={8} />
      <Hatch scene={s} d="M432 120 L522 90 L594 132 L502 164 Z" />
      <Ink d="M466 146 V184 C 500 200, 540 194, 562 176 V138" order={9} />
      <Ink d="M512 128 L548 150 V192" order={10} brass />
      <Ink d="M541 192 H555 L548 210 Z" order={11} brass />
      <Ink d="M420 70 l6 -10 l6 10 l-6 10 z M580 70 l5 -8 l5 8 l-5 8 z" order={12} brass />
    </>
  )
}

/* ---------- Bölüm 4 · Köprü: the business on one side, the software on the other ---------- */
function Bridge() {
  const s: SceneId = 'bridge'
  return (
    <>
      <Wash d="M60 470 V232 H190 V470 Z" />
      <Wash tone="sun" d="M190 402 Q 293 302 396 402 Z" />
      <Wash d="M330 176 H458 Q470 176 470 188 V228 Q470 240 458 240 H434 L438 262 L412 240 H330 Q318 240 318 228 V188 Q318 176 330 176 Z" />
      <Ink d={GROUND} thin />
      {/* office building */}
      <Ink d="M60 470 V232 H190 V470 M50 232 H200" order={0} />
      <Ink d="M78 256 h22 v20 h-22 z M114 256 h22 v20 h-22 z M150 256 h22 v20 h-22 z M78 296 h22 v20 h-22 z M114 296 h22 v20 h-22 z M150 296 h22 v20 h-22 z M78 336 h22 v20 h-22 z M114 336 h22 v20 h-22 z M150 336 h22 v20 h-22 z" order={1} thin />
      <Ink d="M108 470 V426 H142 V470" order={2} />
      <Hatch scene={s} d="M108 470 V426 H142 V470 Z" />
      {/* laptop */}
      <Ink d="M412 332 L560 330 L562 430 L410 432 Z" order={3} />
      <Ink d="M422 342 L550 340 L552 420 L420 422 Z" order={4} thin />
      <Ink d="M396 432 L576 430 L590 452 L382 454 Z" order={5} />
      <Ink d="M436 362 H500 M448 380 H530 M436 398 H484" order={6} thin />
      {/* the bridge */}
      <Ink d="M190 402 H396" order={7} />
      <Ink d="M190 402 Q 293 302 396 402" order={8} />
      <Ink d="M190 402 Q 293 322 396 402" order={9} brass />
      <Ink d="M224 372 V402 M258 352 V402 M293 346 V402 M328 352 V402 M362 372 V402" order={10} thin />
      {/* what travels across: three files */}
      <Ink d="M226 311 h40 v50 h-40 z M226 323 h16 l6 -8 h18" order={11} />
      <Ink d="M280 300 h40 v50 h-40 z M280 312 h16 l6 -8 h18" order={12} />
      <Ink d="M334 318 h40 v50 h-40 z M334 330 h16 l6 -8 h18" order={13} />
      {/* a request from the business, an answer from the software */}
      <Ink d="M150 120 H286 Q298 120 298 132 V176 Q298 188 286 188 H198 L176 208 L180 188 H150 Q138 188 138 176 V132 Q138 120 150 120 Z" order={14} />
      <Ink d="M158 144 H276 M158 162 H240" order={15} thin />
      <Ink d="M330 176 H458 Q470 176 470 188 V228 Q470 240 458 240 H434 L438 262 L412 240 H330 Q318 240 318 228 V188 Q318 176 330 176 Z" order={16} />
      <Ink d="M376 208 l12 12 l26 -28" order={17} brass />
    </>
  )
}

const DRAWINGS: Record<SceneId, () => JSX.Element> = {
  cover: Cover,
  curiosity: Curiosity,
  order: Order,
  product: Product,
  bridge: Bridge,
}

const LABELS: Record<SceneId, string> = {
  cover: 'Ufka uzanan uzun bir yolda, sırt çantasıyla yürüyen bir kişi; yolun iki yanında ağaçlar ve tepeler, ufukta güneş',
  curiosity: 'Yanan bir ampul; altında ilk grafiklerin ve ilk Python satırlarının yazıldığı açık bir defter',
  order: 'Maddeleri işaretlenmiş bir kontrol listesi ve işi kontrol eden bir büyüteç',
  product: 'Ekranında aday kartı ve puan çubukları olan bir dizüstü bilgisayar ve yanında bir mezuniyet kepi',
  bridge: 'Solda bir ofis binası, sağda bir dizüstü bilgisayar; aralarındaki köprünün üstünde üç dosya, üstlerinde bir istek ve onaylanmış bir cevap balonu',
}

export function SceneDrawing({ id, active }: { id: SceneId; active: boolean }) {
  const Drawing = DRAWINGS[id]
  return (
    <svg
      className={active ? 'scene is-active' : 'scene'}
      viewBox="0 0 600 520"
      role="img"
      aria-label={LABELS[id]}
      aria-hidden={!active}
    >
      <Defs id={id} />
      <g filter={`url(#pencil-${id})`}>
        <Drawing />
      </g>
    </svg>
  )
}
