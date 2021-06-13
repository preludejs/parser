import { inspect } from 'util'
import * as Input from './input'
import Invalid from './invalid'
import type P from './parser'

const ascii =
  (chars: string): P<string> =>
    input => {
      const char = Input.unsafeAt(input, 0)
      if (!chars.includes(char)) {
        throw new Invalid(input, `Expected one of ascii ${inspect(chars)}.`)
      }
      return [ Input.advanced(input, 1), char ]
    }

export default ascii
