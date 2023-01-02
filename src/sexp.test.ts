import * as Sexp from './sexp.js'

test('basic', () => {
  expect(Sexp.parser('\n\t(foo  bar baz) ')).toEqual([ 'foo', 'bar', 'baz' ])
})
