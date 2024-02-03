import * as P from './index.js'

test('trim', () => {
  const p = P.parser(P.trim()(P.star(P.either('a', 'b'))))
  expect(p('  aab \n')).toEqual([ 'a', 'a', 'b' ])
})
