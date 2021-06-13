import { inspect } from 'util'
import * as Input from './input.js'
import Invalid from './invalid.js'
import type P from './parser.js'

const literal =
  <T extends string>(expected: T): P<T> =>
    input => {
      if (Input.startsWith(input, expected)) {
        return [ Input.advanced(input, expected.length), expected ]
      }
      throw new Invalid(input, `Expected literal ${inspect(expected)}.`)
    }

export default literal
