import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('times', () => {
  const q = P.times(3, 'a')
  const p = P.parser(q)
  const r: 'a'[] = p('aaa')
  expect(r).toEqual([ 'a', 'a', 'a' ])
})
