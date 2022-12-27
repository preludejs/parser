import * as P from './index.js'

test('betweenLiterals', () => {
  const p = P.betweenLiterals('<!--', '-->')
  expect(p({ input: '<!--abc-->', offset: 0 })).toEqual({ input: { input: '<!--abc-->', offset: 10 }, value: 'abc' })
})
