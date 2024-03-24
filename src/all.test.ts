import * as P from './index.js'

test('all', () => {
  const p = P.parser(P.all(P.re(/\d+/)))
  expect(p('foo 123 bar 456 baz')).toEqual(['123', '456'])
})
