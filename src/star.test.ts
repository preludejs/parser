import * as P from './index.js'

test('star', () => {
  const p = P.parser(P.star(P.either('a', 'b')))
  expect(p('aab')).toEqual([ 'a', 'a', 'b' ])
})

test('break on non-advancing parser', () => {
  const blank = P.map(P.seq(/ */, P.eol), _ => _[0])
  const p = P.parser(P.star(blank))
  expect(p(' \n\n')).toEqual([ ' ', '', '' ])
})
