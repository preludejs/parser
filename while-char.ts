import { includes, peek, eat, fail, Parser } from './prelude.js'

/** Matches any char listed in `chars` at least `min` (default `0`) times. */
export const whileChar =
  (chars: string, min = 0): Parser<string> =>
    input => {
      let i = 0
      while (includes(chars, peek(input, i))) {
        i++
      }
      return i >= min ?
        eat(input, i) :
        fail(input, `While char(s) ${chars} failed for min ${min} (i ${i}).`)
    }

export default whileChar
