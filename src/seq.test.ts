import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('lift', () => {
  const parser = P.parser(P.seq(
    '<',
    /\w+/,
    '>'
  ))
  const parsed = parser('<abc>')
  const a: '<' = parsed[0]
  const b: string = parsed[1]
  const c: '>' = parsed[2]
  expect(a).toBe('<')
  expect(b).toBe('abc')
  expect(c).toBe('>')
})
