import * as P from './index.js'

test('star', () => {
  const p = P.exhaustive(P.star(P.either(P.literal('a'), P.literal('b'))))
  expect(p('aab')).toEqual([ 'a', 'a', 'b' ])
})
