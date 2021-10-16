import { inspect } from 'util'
import * as Input from './input.js'
import Invalid from './invalid.js'
import type P from './parser.js'

const charRanges =
  (...ranges: [min: string, max: string][]): P<string> =>
    input => {
      const char = Input.unsafeAt(input, 0)
      if (!ranges.some(_ => char >= _[0] && char <= _[1])) {
        throw new Invalid(input, `Expected char in one of ${ranges.map(_ => `${inspect(_[0])}..${inspect(_[1])}`).join(', ')} ranges.`)
      }
      return [ Input.advanced(input, 1), char ]
    }

export default charRanges
