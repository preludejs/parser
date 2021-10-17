import { eat, peek, fail, includes, Parser } from './prelude.js'

/** @returns parser matching one of provided chars. */
const utf8 =
  (chars: string): Parser<string> =>
    chars.length === 1 ?
      input => peek(input) === chars ?
        eat(input, 1) :
        fail(input, `Expected char ${chars}.`) :
      input => includes(chars, peek(input)) ?
        eat(input, 1) :
        fail(input, `Expected one of chars ${chars}.`)

export default utf8
