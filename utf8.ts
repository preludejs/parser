import { inspect } from 'util'
import * as Input from './input.js'
import Invalid from './invalid.js'
import type P from './parser.js'

/** @returns parser matching one of provided utf8 chars. */
const utf8 =
  (chars: string): P<string> =>
    chars.length === 1 ?
      input => {

        // Safe to read out of bound `undefined` which simply won't match.
        const char = Input.unsafeAt(input, 0)
        if (chars !== char) {
          throw new Invalid(input, `Expected one of utf8 chars ${inspect(chars.split(''))}.`)
        }
        return [ Input.advanced(input, 1), char ]
      } :
      input => {

        // Safe to read out of bound `undefined` which simply won't match.
        const char = Input.unsafeAt(input, 0)
        if (!chars.includes(char)) {
          throw new Invalid(input, `Expected one of utf8 chars ${inspect(chars.split(''))}.`)
        }
        return [ Input.advanced(input, 1), char ]
      }

export default utf8
