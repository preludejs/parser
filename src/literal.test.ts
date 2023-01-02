import * as P from './index.js'

test('literal', () => {
  expect(P.parser(P.literal('a'))('a')).toEqual('a')
  const p = P.parser(P.either(P.literal('a'), P.literal('b')))
  expect(p('a')).toEqual('a')
  expect(p('b')).toEqual('b')
  expect(() => p('c')).toThrow('Expected b.')
})
