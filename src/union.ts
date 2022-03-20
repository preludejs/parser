import { fail, failed, Parser, Input } from './prelude.js'

const reentry = new WeakMap<Input, Set<Parser<unknown>>>()

const union =
  <T extends Parser<unknown>[]>(...as: T): T[number] =>
    input => {
      const set = reentry.get(input) ?? reentry.set(input, new Set).get(input)!
      for (const a of as) {
        if (set.has(a)) {
          continue
        }
        set.add(a)
        const a_ = a(input)
        set.delete(a)
        if (!failed(a_)) {
          return a_
        }
      }
      return fail(input, `None of ${as.length} alternatives matched at ${input[1]}.`)
    }

export default union
