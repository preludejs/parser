import * as P from './index.js'

test('reentry', () => {
  type Node =
    | number
    | { type: 'Eq', lhs: Node, rhs: Node }
  const p_ =
    (reader: P.Reader.t) =>
      P.map(P.seq(p, '=', p), _ => ({ type: 'Eq' as const, lhs: _[0], rhs: _[2] }))(reader)
  const p: P.t<Node> =
    reader =>
      P.first(
        p_,
        P.map(P.charRange('09'), parseFloat)
      )(reader)
  expect(P.parser(p)('1=2=3')).toEqual({
    type: 'Eq',
    lhs: 1,
    rhs: {
      type: 'Eq',
      lhs: 2,
      rhs: 3
    }
  })
})

test('longest', () => {
  expect(P.parser(P.star(P.longestReentrant('a', 'aa')))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
