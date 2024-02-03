import * as P from './index.js'

test('sep', () => {
  const number = P.map(P.whileChars('0123456789'), parseFloat)
  const p = P.parser(P.between('(', ')', P.sep0(P.ws1, number)))
  expect(p('(1 23  456)')).toEqual([ 1, 23, 456 ])
})
