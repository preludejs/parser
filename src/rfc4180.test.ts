import { test, expect } from '@jest/globals'
import * as Rfc4180 from './rfc4180.js'

test('basic', () => {
  expect(Rfc4180.parse('foo,bar,baz\n1,2,"three"\n')).toEqual([
    [ 'foo', 'bar', 'baz' ],
    [ '1', '2', 'three' ],
    [ '' ]
  ])
})

test('quoted', () => {
  expect(Rfc4180.parse('"a""b\nc"')).toEqual([ [ 'a"b\nc' ] ])
})
