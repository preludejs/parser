import * as $ from './index.js'

test('firstLiteral', () => {
  expect($.exhaustive($.star($.firstLiteral(
    'a',
    'aa'
  )))('aaaaa')).toEqual([
    'a',
    'a',
    'a',
    'a',
    'a'
  ])
})
