import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('right', () => {
  const p = P.parser(P.right('=', P.re(/\d+/)))
  expect(p('=123')).toEqual('123')
})
