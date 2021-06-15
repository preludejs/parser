import { inspect } from 'util'
import * as Input from './input'
import Invalid from './invalid'
import type P from './parser'

/** @returns parser matching `min-max` char range. */
const charRange =
  (min: string, max: string): P<string> =>
    input => {
      const char = Input.unsafeAt(input, 0)
      if (char < min || char > max) {
        throw new Invalid(input, `Expected char in ${inspect(min)}..${inspect(max)} range.`)
      }
      return [ Input.advanced(input, 1), char ]
    }

export default charRange
