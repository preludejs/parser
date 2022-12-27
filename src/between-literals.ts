import { type Input, startsWith, offsetOf, slice, ok, fail } from './prelude.js'

export default function betweenLiterals(a: string, b: string) {
  return function (input: Input) {
    if (!startsWith(input, a)) {
      return fail(input, `expected start literal ${a}`)
    }
    const offset = offsetOf(input, b, a.length)
    if (offset === -1) {
      return fail(input, `expected end literal ${b}`)
    }
    return ok(input, slice(input, a.length, offset), offset + b.length)
  }
}
