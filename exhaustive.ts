import { end, failed, Parser } from './prelude.js'

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
const exhaustive =
  <A>(a: Parser<A>) =>
    (inputString: string): A => {
      const a_ = a([ inputString, 0 ])
      if (failed(a_)) {
        throw new Error(a_[2])
      }
      if (!end(a_[0])) {
        throw new Error(`Expected exhaustive result, unparsed ${a_[0][0].length - a_[0][1]}.`)
      }
      return a_[1]
    }

export default exhaustive
