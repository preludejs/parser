import * as P from './index.js'

test('star', () => {
  const p = P.parser(P.star(P.either(P.literal('a'), P.literal('b'))))
  expect(p('aab')).toEqual([ 'a', 'a', 'b' ])
})
