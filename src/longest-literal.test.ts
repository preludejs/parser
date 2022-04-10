import * as $ from './index.js'

test('longest', () => {
  expect($.exhaustive($.star($.longestLiteral(
    'a',
    'aa'
  )))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
