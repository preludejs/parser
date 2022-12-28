import * as P from './index.js'

test('separated', () => {
  const number = P.map(P.whileChar('0123456789'), parseFloat)
  const p = P.exhaustive(P.sorrounded(P.literal('('), P.literal(')'), P.separated0(P.ws1, number)))
  expect(p('(1 23  456)')).toEqual([ 1, 23, 456 ])
})
