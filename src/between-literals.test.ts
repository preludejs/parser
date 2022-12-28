import * as P from './index.js'

test('betweenLiterals', () => {
  const p = P.betweenLiterals('<!--', '-->')
  expect(p(P.Reader.of('<!--abc-->'))).toEqual(
    P.Result.ok(P.Reader.of('<!--abc-->', 10), 'abc')
  )
})
