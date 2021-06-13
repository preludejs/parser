import type P from './parser'

const pair =
  <A, B>(a: P<A>, b: P<B>): P<[A, B]> =>
    input => {
      const a_ = a(input)
      const b_ = b(a_[0])
      return [ b_[0], [ a_[1], b_[1] ] ]
    }

export default pair
