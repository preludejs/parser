import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('from-until', () => {
  const p = P.parser(P.fromUntil('BEGIN', 'END'))
  expect(p('BEGIN END')).toEqual({ head: 'BEGIN', inner: ' ', tail: 'END' })
  expect(p('BEGIN foo END')).toEqual({ head: 'BEGIN', inner: ' foo ', tail: 'END' })
})
