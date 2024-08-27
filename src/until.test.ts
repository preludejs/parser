import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('until', () => {
  const p = P.parser(P.until('END'))
  expect(p('END')).toEqual({ head: '', tail: 'END' })
  expect(p('foo END')).toEqual({ head: 'foo ', tail: 'END' })
  expect(() => p('foo END bar')).toThrow(`Expected exhaustive result, parsed 7 (unparsed 4).

foo END bar
       ^ 1:8`)
})
