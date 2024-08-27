import { test, expect } from '@jest/globals'
import escaped from './escaped.js'
import { parse } from '../parser.js'

test('escaped', () => {
  expect(parse(escaped, '"foo"')).toEqual('foo')
  expect(parse(escaped, '""')).toEqual('')
  expect(parse(escaped, '"foo""bar"')).toEqual('foo"bar')
})
