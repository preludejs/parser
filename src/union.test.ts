import * as $ from './index.js'

test('reentry', () => {
  type Node =
    | number
    | { type: 'Eq', lhs: Node, rhs: Node }
  const p_ =
    input =>
      $.map($.sequence(p, $.literal('='), p), _ => ({ type: 'Eq' as const, lhs: _[0], rhs: _[2] }))(input)
  const p: $.Parser<Node> =
    input =>
      $.union(
        p_,
        $.map($.charRange('09'), parseFloat)
      )(input)
  expect($.exhaustive(p)('1=2=3')).toEqual({
    type: 'Eq',
    lhs: 1,
    rhs: {
      type: 'Eq',
      lhs: 2,
      rhs: 3
    }
  })
})
