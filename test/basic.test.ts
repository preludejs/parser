import * as P from '../index.js'

test('simple', () => {
  const p = P.either(P.literal('a'), P.literal('b'))
  expect(p(P.Input.of('a'))).toEqual([ { string: 'a', offset: 1 }, 'a' ])
  expect(p(P.Input.of('b'))).toEqual([ { string: 'b', offset: 1 }, 'b' ])
  expect(() => p(P.Input.of('c'))).toThrow('At 0. Expected literal \'b\'.')
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
