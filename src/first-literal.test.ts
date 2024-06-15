import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('firstLiteral', () => {
  expect(P.parser(P.star(P.firstLiteral(
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
