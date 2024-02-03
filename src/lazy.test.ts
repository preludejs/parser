import * as P from './index.js'

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
    P.Rfc8259.number

  const add =
    P.lazy(() => P.map(P.sequence(expr, '+', expr), _ => _[0] + _[2]))

  const mul =
    P.lazy(() => P.map(P.sequence(expr, '*', expr), _ => _[0] * _[2]))

  const grouped =
    P.lazy(() => P.between('(', ')', expr))

  const expr: P.t<number> =
    P.lazy(() => P.longestReentrant(
      number_,
      add,
      mul,
      grouped
    ))

  expect(P.parser(expr)('(2*1)+1')).toEqual(3)

})
