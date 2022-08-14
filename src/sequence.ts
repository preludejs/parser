import { failed, fail, ok, type Ok, type Parsed, type Parser } from './prelude.js'

const sequence =
  <T extends Parser<unknown>[]>(...as: T): Parser<{ [K in keyof T]: Parsed<T[K]> }> =>
    input => {
      const rs: unknown[] = []
      let input_ = input
      for (const a of as) {
        const a_ = a(input_)
        if (failed(a_)) {
          return fail(input, `Failed sequence. ` + a_[2])
        }
        rs.push(a_[1])
        input_ = a_[0]
      }
      return ok(input_, rs) as Ok<{ [K in keyof T]: Parsed<T[K]> }>
    }

export default sequence
