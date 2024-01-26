import * as P from './index.js'

test('firstExhaustive', () => {
  const q = P.firstExhaustive(
    P.Rfc8259.number,
    P.Rfc8259.null
  )
  const p = P.parser(q)
  expect(p('1234')).toEqual(1234)
  expect(p('null')).toEqual(null)
  expect(() => p('true')).toThrow('None of 2 alternatives matched at 0.')
  expect(() => p('1234null')).toThrow('None of 2 alternatives matched at 0.')
  expect(() => p('null ')).toThrow('None of 2 alternatives matched at 0.')
  expect(() => p('null1')).toThrow('None of 2 alternatives matched at 0.')
})
