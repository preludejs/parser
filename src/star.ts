import { ok, fail, failed, Parser } from './prelude.js'

/** @returns parser matching at least `min` (default 0) times `a` parser. */
export const star =
  <A>(a: Parser<A>, min = 0): Parser<A[]> =>
    input => {
      const rs: A[] = []
      let input_ = input
      while (true) {
        const a_ = a(input_)
        if (failed(a_)) {
          break
        }
        rs.push(a_[1])
        input_ = a_[0]
      }
      if (rs.length < min) {
        return fail(input, `Expected to match minimum length ${min}, matched only ${rs.length}.`)
      }
      return ok(input_, rs)
    }

export default star
