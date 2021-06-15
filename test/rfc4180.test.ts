import * as Rfc4180 from '../rfc4180'

test('basic', () => {
  expect(Rfc4180.parse(`foo,bar,baz
1,2,"three"
`)).toEqual([
  ['foo', 'bar', 'baz'],
  ['1', '2', 'three'],
  ['']
])
})

test('quoted', () => {
  expect(Rfc4180.parse('"a""b\nc"')).toEqual([ [ 'a"b\nc' ] ])
})
