import { ok, failed, Parser } from './prelude.js'

const maybe =
  <A>(a: Parser<A>): Parser<undefined | A> =>
    input => {
      const a_ = a(input)
      return failed(a_) ?
        ok<undefined>(input, undefined, 0) :
        a_
    }

export default maybe
