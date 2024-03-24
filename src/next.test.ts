import * as P from './index.js'

test('next', () => {
  const p = P.next(P.re(/\d+/))
  const input = 'foo 123 bar 123 baz'
  const a = p(P.Reader.of(input))
  expect(a).toEqual({ reader: { input, offset: 7 }, value: '123' })
  const b = p(a.reader)
  expect(b).toEqual({ reader: { input, offset: 15 }, value: '123' })
})

test('liftable next', () => {
  const p = P.next('[')
  const input = 'foo [123] bar [123] baz'
  const a = p(P.Reader.of(input))
  expect(a).toEqual({ reader: { input, offset: 5 }, value: '[' })
  const b = p(a.reader)
  expect(b).toEqual({ reader: { input, offset: 15 }, value: '[' })
})
