import { fail, failed, Parser, Input } from './prelude.js'

const reentry = new WeakMap<Input, Set<number>>()

const union =
  <T extends Parser<unknown>[]>(...as: T): T[number] =>
    input => {
      const set = reentry.get(input) ?? reentry.set(input, new Set).get(input)!
      for (let i = 0; i < as.length; i++) {
        if (set.has(i)) {
          continue
        }
        set.add(i)
        const a_ = as[i](input)
        set.delete(i)
        if (!failed(a_)) {
          return a_
        }
      }
      return fail(input, `None of ${as.length} alternatives matched at ${input[1]}.`)
    }

export default union
