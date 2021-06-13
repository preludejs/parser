import type P from './parser'

const map =
  <A, B>(a: P<A>, f: (_: A) => B): P<B> =>
    input => {
      const [ input_, r ] = a(input)
      return [ input_, f(r) ]
    }

export default map
