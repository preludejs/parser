import { fail, failed, type Parser, type Input, type Ok } from './prelude.js'

const reentry = new WeakMap<Input, Set<Parser<unknown>>>()

/** Union where first successful match is returned. */
const first =
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
          return a_ as Ok<T[number]>
        }
      }
      return fail(input, `None of ${as.length} alternatives matched at ${input.offset}.`)
    }

export default first
