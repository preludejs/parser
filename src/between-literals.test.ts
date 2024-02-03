import * as P from './index.js'

test('betweenLiterals', () => {
  const p = P.betweenLiterals('<!--', '-->')
  expect(p(P.Reader.of('<!--abc-->'))).toEqual(
    P.Result.ok(P.Reader.of('<!--abc-->', 10), 'abc')
  )
})

test('str', () => {
  const p = P.betweenLiterals('"', '"')
  expect(p(P.Reader.of('"abc"'))).toEqual(
    P.Result.ok(P.Reader.of('"abc"', 5), 'abc')
  )
})

test('attr', () => {
  const id =
    P.join(P.star(P.charRange('09azAZ'), 1))

  const str =
    P.either(
      P.betweenLiterals('\'', '\''),
      P.betweenLiterals('"', '"')
    )

  const attr =
    P.map(P.seq(P.ws0, id, '=', str), _ => [_[1], _[3]])

  const p = P.parser(attr)

  expect(p('foo="bar"')).toEqual(["foo", "bar"])
})
