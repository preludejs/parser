import * as $ from './index.js'

test('mutually recursive', () => {

  const numeric =
    $.Rfc8259.number_

  const addition =
    $.memoized(() => $.map($.sequence(expression, $.literal('+'), expression), _ => ({
      type: 'Addition',
      lhs: _[0],
      rhs: _[2]
    })))

  const multiplication =
    $.memoized(() => $.map($.sequence(expression, $.literal('*'), expression), _ => ({
      type: 'Addition',
      lhs: _[0],
      rhs: _[2]
    })))

  const expression =
    $.memoized(() => $.longest(
      numeric,
      addition,
      multiplication
    ))

  console.log($.exhaustive(expression)('1+1*2+3*4'))

})
