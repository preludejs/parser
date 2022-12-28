import * as P from './index.js'

test('trim', () => {
  const p = P.exhaustive(P.trim()(P.star(P.either(P.literal('a'), P.literal('b')))))
  expect(p('  aab \n')).toEqual([ 'a', 'a', 'b' ])
})