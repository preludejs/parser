import * as P from './index.js'

test('between', () => {
  const number = P.map(P.whileChars('0123456789'), parseFloat)
  const between = P.between(P.literal('('), P.literal(')'), number)
  const p = P.parser(P.trim()(between))
  expect(p(' (123)\n')).toEqual(123)
})
