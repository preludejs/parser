import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('mapFailure', () => {
  const p = P.mapFailure(P.re(/\d/), _ => P.Result.fail(_.reader, `${_.reason}, at offset ${_.reader.offset} for input "${_.reader.input}"`))
  expect(() => P.parse(p, 'a')).toThrow('regexp /\\d/dy did not match, at offset 0 for input "a"')
})
