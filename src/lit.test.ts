import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('single', () => {
  expect(P.parser(P.lit('a'))('a')).toEqual('a')
  const p = P.parser(P.either('a', 'b'))
  expect(p('a')).toEqual('a')
  expect(p('b')).toEqual('b')
  expect(() => p('c')).toThrow('Expected b.')
})

test('longest', () => {
  expect(P.parser(P.star(P.lit(
    'a',
    'aa'
  )))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
