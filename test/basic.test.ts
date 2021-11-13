import * as P from '../cjs/index.js'

test('simple', () => {
  expect(P.exhaustive(P.literal('a'))('a')).toEqual('a')
  const p = P.exhaustive(P.either(P.literal('a'), P.literal('b')))
  expect(p('a')).toEqual('a')
  expect(p('b')).toEqual('b')
  expect(() => p('c')).toThrow('Expected b.')
})

test('star', () => {
  const p = P.exhaustive(P.star(P.either(P.literal('a'), P.literal('b'))))
  expect(p('aab')).toEqual([ 'a', 'a', 'b' ])
})

test('trim', () => {
  const p = P.exhaustive(P.trim(P.star(P.either(P.literal('a'), P.literal('b')))))
  expect(p('  aab \n')).toEqual([ 'a', 'a', 'b' ])
})

test('sorrounded', () => {
  const number = P.map(P.whileChar('0123456789'), parseFloat)
  const sorrounded = P.sorrounded(P.literal('('), P.literal(')'), number)
  const p = P.exhaustive(P.trim(sorrounded))
  expect(p(' (123)\n')).toEqual(123)
})

test('separated', () => {
  const number = P.map(P.whileChar('0123456789'), parseFloat)
  const p = P.exhaustive(P.sorrounded(P.literal('('), P.literal(')'), P.separated0(P.ws1, number)))
  expect(p('(1 23  456)')).toEqual([ 1, 23, 456 ])
})
