import { inspect } from 'util'
import * as Input from './input'
import Invalid from './invalid'
import type P from './parser'

const charRange =
  (min: string, max: string): P<string> =>
    input => {
      const char = Input.unsafeAt(input, 0)
      if (char < min || char > max) {
        throw new Invalid(input, `Expected char ${inspect(char)}.`)
      }
      return [ Input.advanced(input, 1), char ]
    }

export default charRange
