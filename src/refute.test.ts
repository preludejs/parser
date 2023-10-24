import * as P from './index.js'
import * as $ from '@prelude/refute'

test('refute', () => {
  const a = P.refute(P.Rfc8259.number, $.between(3, 5))
  const p = P.parser(a)
  expect(p('4')).toEqual(4)
  expect(() => p('12')).toThrow('Invalid value expected number between 3 and 5, got 12.')
  expect(a(P.Reader.of('24'))).toEqual(P.Result.fail(P.Reader.of('24'), 'Invalid value expected number between 3 and 5, got 24.'))
})
