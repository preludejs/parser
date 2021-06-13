import * as Input from './input.js'
import Invalid from './invalid.js'
import type P from './parser.js'

const exhaustive: <A>(a: P<A>) => (string: string) => A =
  a =>
    string => {
      const [ input_, r ] = a(Input.of(string))
      if (!Input.end(input_)) {
        throw new Invalid(input_, `Expected exhaustive result, got unparsed remaining length ${Input.remainingLength(input_)}.`)
      }
      return r
    }

export default exhaustive
