import { end, failed, Parser } from './prelude.js'

/**
 * @returns top level string to result parser asserting all input has been parsed.
 * @throws If parser fails or input is not fully exhausted.
 */
const exhaustive =
  <A>(a: Parser<A>) =>
    (input: string): A => {
      const a_ = a({ input, offset: 0 })
      if (failed(a_)) {
        throw new Error(a_.reason)
      }
      if (!end(a_.input)) {
        throw new Error(`Expected exhaustive result, unparsed ${a_.input.input.length - a_.input.offset}.`)
      }
      return a_.value
    }

export default exhaustive
