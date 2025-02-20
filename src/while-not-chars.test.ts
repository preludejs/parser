import * as P from './index.js'

test('whileNotChars', () => {
  const parser = P.parser(P.whileNotChars(' /<>', 1))
  expect(parser('foo')).toEqual('foo')
})
