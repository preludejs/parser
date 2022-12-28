import * as $ from './index.js'

test('reentry', () => {
  type Node =
    | number
    | { type: 'Eq', lhs: Node, rhs: Node }
  const p_ =
    (reader: $.Reader.t) =>
      $.map($.sequence(p, $.literal('='), p), _ => ({ type: 'Eq' as const, lhs: _[0], rhs: _[2] }))(reader)
  const p: $.Parser.t<Node> =
    reader =>
      $.first(
        p_,
        $.map($.charRange('09'), parseFloat)
      )(reader)
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

test('longest', () => {
  expect($.exhaustive($.star($.longest(
    $.literal('a'),
    $.literal('aa')
  )))('aaaaa')).toEqual([
    'aa',
    'aa',
    'a'
  ])
})
