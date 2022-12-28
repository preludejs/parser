import * as $ from './index.js'

test('mutually recursive', () => {

  type Numeric = {
    type: 'Numeric',
    value: number
  }

  type Addition = {
    type: 'Addition',
    lhs: Expression,
    rhs: Expression
  }

  type Multiplication = {
    type: 'Multiplication',
    lhs: Expression,
    rhs: Expression
  }

  type Expression =
    | Numeric
    | Addition
    | Multiplication

  const number_ =
    $.Rfc8259.number

  const add =
    $.lazy(() => $.map($.sequence(expr, $.literal('+'), expr), _ => _[0] + _[2]))

  const mul =
    $.lazy(() => $.map($.sequence(expr, $.literal('*'), expr), _ => _[0] * _[2]))

  const grouped =
    $.lazy(() => $.between($.literal('('), $.literal(')'), expr))

  const expr: $.Parser.t<number> =
    $.lazy(() => $.longestReentrant(
      number_,
      add,
      mul,
      grouped
    ))

  expect($.exhaustive(expr)('(2*1)+1')).toEqual(3)

})
