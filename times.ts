import { ok, fail, failed, Parser } from './prelude.js'

const times =
  <A>(n: number, a: Parser<A>): Parser<A[]> =>
    input => {
      const rs: A[] = []
      let input_ = input
      for (let i = 0; i < n; i++) {
        const a_ = a(input_)
        if (failed(a_)) {
          return fail(input, `Expected ${n} times, got ${i + 1} times only.`)
        }
        rs.push(a_[1])
        input_ = a_[0]
      }
      return ok(input_, rs)
    }

export default times
