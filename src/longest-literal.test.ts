import * as P from './index.js'

test('longest', () => {
  expect(P.parser(P.star(P.longestLiteral(
    'a',
    'aa'
  )))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
