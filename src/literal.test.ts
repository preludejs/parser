import * as P from './index.js'

test('single', () => {
  expect(P.parser(P.literal('a'))('a')).toEqual('a')
  const p = P.parser(P.either(P.literal('a'), P.literal('b')))
  expect(p('a')).toEqual('a')
  expect(p('b')).toEqual('b')
  expect(() => p('c')).toThrow('Expected b.')
})

test('longest', () => {
  expect(P.parser(P.star(P.literal(
    'a',
    'aa'
  )))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
