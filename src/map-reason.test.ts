import * as P from './index.js'

test('mapReason', () => {
  const p = P.mapReason(P.re(/^\d/dy), _ => `<test>${_}</test>`)
  expect(() => P.parse(p, 'a')).toThrow('<test>regex did not match</test>')
})
