import { fail, failed, Parser } from './prelude.js'

const union =
  <T extends Parser<unknown>[]>(...as: T): T[number] =>
    input => {
      for (const a of as) {
        const a_ = a(input)
        if (!failed(a_)) {
          return a_
        }
      }
      return fail(input, `None of ${as.length} alternatives matched at ${input[1]}.`)
    }

export default union
