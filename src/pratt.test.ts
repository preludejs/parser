import * as P from './index.js'

test('pratt', () => {
  const p = P.parser(P.pratt({
    prefix: {
      '-': [NaN, 9],
      '+': [NaN, 9]
    },
    infix: {
      '=': [2, 1],
      '?': [4, 3],
      '+': [5, 6],
      '-': [5, 6],
      '*': [7, 8],
      '/': [7, 8],
      '.': [14, 13]
    },
    postfix: {
      '!': [11, NaN],
      '[': [11, NaN]
    }
  }, P.Json.number))
  expect(p('1+2*3')).toEqual(({
    type: 'infix',
    op: '+',
    lhs: 1,
    rhs: {
      type: 'infix',
      op: '*',
      lhs: 2,
      rhs: 3
    }
  }))
  expect(p('1*2+3')).toEqual(({
    type: 'infix',
    op: '+',
    lhs: {
      type: 'infix',
      op: '*',
      lhs: 1,
      rhs: 2
    },
    rhs: 3
  }))
})
