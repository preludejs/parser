import * as P from './index.js'

test('comment', () => {
  const comment = P.re(/<!--(.*?)-->/dy, 1)
  expect(P.parse(comment, '<!--foo-->')).toEqual('foo')
  expect(P.parse(P.star(P.or(P.ws1, comment)), ' <!--foo--> <!--bar--> ')).toEqual([
    ' ',
    'foo',
    ' ',
    'bar',
    ' '
  ])
})

test('digit', () => {
  const p = P.map(P.re(/^\d/dy), _ => parseInt(_, 10))
  expect(P.parse(p, '1')).toEqual(1)
  expect(() => P.parse(p, '123')).toThrow('Expected exhaustive result, unparsed 2.')
})
