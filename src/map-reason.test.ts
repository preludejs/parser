import * as P from './index.js'

test('mapReason', () => {
  const p = P.mapReason(P.re(/\d/), _ => `<test>${_}</test>`)
  expect(() => P.parse(p, 'a')).toThrow('<test>regexp /\\d/dy did not match</test>')
})
