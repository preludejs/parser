import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('left', () => {
  const p = P.parser(P.left(P.re(/\d+/), '='))
  expect(p('123=')).toEqual('123')
})
