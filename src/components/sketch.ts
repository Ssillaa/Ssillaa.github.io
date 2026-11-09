import rough from 'roughjs'
import type { Options, PathInfo } from 'roughjs/bin/core'

/*
 * Rough.js turns each clean path into a hand-drawn one.
 * We use only its generator: it returns path data, and React draws the paths,
 * so the CSS line-drawing animation and the colour tokens keep working.
 */
const generator = rough.generator()
const cache = new Map<string, PathInfo[]>()

/** A stable seed per shape, so a line looks the same on every visit. */
function seedOf(text: string): number {
  let h = 2166136261
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619)
  return (h >>> 0) % 2147483646 + 1
}

export function sketch(d: string, options: Options): PathInfo[] {
  const key = d + JSON.stringify(options)
  let paths = cache.get(key)
  if (!paths) {
    paths = generator.toPaths(generator.path(d, { seed: seedOf(d), ...options }))
    cache.set(key, paths)
  }
  return paths
}

/** The pencil line: a little shaky, a little bowed, gone over twice. */
export function line(d: string, width: number): string[] {
  return sketch(d, { stroke: 'currentColor', strokeWidth: width, roughness: 1.15, bowing: 1.3 }).map((p) => p.d)
}

/** Pencil shading inside a shape, without its outline: hatching, cross-hatching, dots, zigzag. */
export function fillLines(d: string, fillStyle: string, gap: number, angle: number, weight: number): string[] {
  return sketch(d, { stroke: 'none', fill: 'currentColor', fillStyle, hachureGap: gap, hachureAngle: angle, fillWeight: weight, roughness: 1.3 })
    .filter((p) => p.stroke !== 'none')
    .map((p) => p.d)
}

/** A colour wash: a solid fill whose edge wanders like watercolour. */
export function wash(d: string): string[] {
  return sketch(d, { stroke: 'none', fill: 'currentColor', fillStyle: 'solid', roughness: 1.8 })
    .filter((p) => p.fill && p.fill !== 'none')
    .map((p) => p.d)
}
