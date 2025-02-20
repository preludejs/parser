import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('any', () => {
  const p = P.parser(
    P.map(P.seq('[', P.any, ']'), _ => _[1])
  )
  expect(p('[a]')).toEqual('a')
  expect(() => p('[]')).toThrow('Failed sequence. Expected ].')
  expect(() => p('[  ]')).toThrow('Failed sequence. Expected ].')
})
