import { fail, failed, type Parser, type Input, type Ok } from './prelude.js'

const reentry = new WeakMap<Input, Set<Parser<unknown>>>()

const union =
  <T extends Parser<unknown>[]>(...as: T): T[number] =>
    input => {
      const set = reentry.get(input) ?? reentry.set(input, new Set).get(input)!
      let r: undefined | Ok<unknown> = undefined
      for (const a of as) {
        if (set.has(a)) {
          continue
        }
        set.add(a)
        const a_ = a(input)
        set.delete(a)
        if (!failed(a_)) {
          if (r === undefined || r[0][1] < a_[0][1]) {
            r = a_
          }
        }
      }
      return r ?
        r :
        fail(input, `None of ${as.length} alternatives matched at ${input[1]}.`)
    }

export default union
