import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('maybeMap', () => {
  const p = P.parser(P.maybeMap(P.Rfc8259.number, _ => _.value % 2 === 0 ? _ : P.Result.fail(_.reader, 'not even')))
  expect(p('1234')).toEqual(1234)
  expect(() => p('123')).toThrow('not even')
})
