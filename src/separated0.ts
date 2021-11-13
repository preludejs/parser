import { ok, failed, Parser } from './prelude.js'
import separated1 from './separated1.js'

const separated0 =
  <A>(s: Parser<unknown>, a: Parser<A>): Parser<A[]> =>
    input => {
      const a_ = separated1(s, a)(input)
      return failed(a_) ?
        ok(input, []) :
        a_
    }

export default separated0
