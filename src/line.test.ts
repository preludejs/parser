import * as P from './index.js'

test('line', () => {
  const parser = P.parser(P.star(P.line))
  console.log(parser('hello\nworld\r\n'))
  expect(parser('hello\nworld\n')).toEqual([
    'hello',
    'world'
  ])
  expect(parser('hello\r\nworld\n')).toEqual([
    'hello',
    'world'
  ])
})
