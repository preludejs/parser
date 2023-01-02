import * as P from './index.js'

test('simple', () => {
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
