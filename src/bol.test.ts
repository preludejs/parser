import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('bol', () => {
  const p = P.parser(P.all(P.map(P.seq(P.bol, '#', P.line), _ => _[2])))
  expect(p('#zero\nfoo\n#one\n #not\n#two')).toEqual([
    'zero',
    'one',
    'two'
  ])
})
