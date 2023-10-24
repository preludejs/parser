import * as P from './index.js'

test('mapFailure', () => {
  const p = P.mapFailure(P.re(/^\d/dy), _ => P.Result.fail(_.reader, `${_.reason}, at offset ${_.reader.offset} for input "${_.reader.input}"`))
  expect(() => P.parse(p, 'a')).toThrow('regex did not match, at offset 0 for input "a"')
})
