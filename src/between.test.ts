import { test, expect } from '@jest/globals'
import * as P from './index.js'

test('between', () => {
  const p = P.between('<!--', '-->')
  expect(p(P.Reader.of('<!--abc-->'))).toEqual(
    P.Result.ok(P.Reader.of('<!--abc-->', 10), 'abc')
  )
})

test('between double quoted', () => {
  const p = P.between('"')
  expect(p(P.Reader.of('"abc"'))).toEqual(
    P.Result.ok(P.Reader.of('"abc"', 5), 'abc')
  )
})

test('between html attribute like', () => {

  const id =
    P.re(/\w+/)

  const str =
    P.either(
      P.between('\''),
      P.between('"')
    )

  const attr =
    P.map(P.seq(id, '=', str), _ => [ _[0], _[2] ] as const)

  const attrs =
    P.map(P.sep1(P.ws1, attr), entries => Object.fromEntries(entries))

  const parser =
    P.parser(attrs)

  expect(parser('foo="1" bar=\'2\'')).toEqual({
    foo: '1',
    bar: '2'
  })
})
