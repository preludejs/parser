import { failed, Parser } from './prelude.js'

const either =
  <A, B>(a: Parser<A>, b: Parser<B>): Parser<A | B> =>
    input => {
      const a_ = a(input)
      return failed(a_) ?
        b(input) :
        a_
    }

export default either
