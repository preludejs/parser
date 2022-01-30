import * as Sexp from './sexp.js'

test('basic', () => {
  expect(Sexp.parse('\n\t(foo  bar baz) ')).toEqual([ 'foo', 'bar', 'baz' ])
})
