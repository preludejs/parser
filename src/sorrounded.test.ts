import * as P from './index.js'

test('sorrounded', () => {
  const number = P.map(P.whileChars('0123456789'), parseFloat)
  const sorrounded = P.sorrounded(P.literal('('), P.literal(')'), number)
  const p = P.exhaustive(P.trim()(sorrounded))
  expect(p(' (123)\n')).toEqual(123)
})
