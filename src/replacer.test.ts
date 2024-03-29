import * as P from './index.js'

test('replacer', () => {
  const parser = P.replacer(P.seq('[', P.re(/[^\]]+/), ']'), _ => `(${_.value[1].toUpperCase()})`)
  const result = P.parse(parser, 'a,b,c')
  expect(result).toStrictEqual(P.ok(P.Reader.of('A,b,c'), 1, 'A'))
})
