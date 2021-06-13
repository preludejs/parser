import * as Input from './input'
import Invalid from './invalid'
import type P from './parser'

const whileChar =
  (chars: string, min = 0): P<string> =>
    input => {
      let i
      const n = Input.remainingLength(input)
      for (i = 0; i < n; i++) {
        if (!chars.includes(Input.unsafeAt(input, i))) {
          break
        }
      }
      if (i < min) {
        throw new Invalid(input, `Expected ${min} minimum characters passing predicate, only ${i} passed.`)
      }
      return [ Input.advanced(input, i), Input.slice(input, 0, i) ]
    }

export default whileChar
