import * as P from './index.js'
import * as R from '@prelude/refute'

test('comment', () => {
  const comment = P.re(/<!--(.*?)-->/, 1)
  expect(P.parse(comment, '<!--foo-->')).toEqual('foo')
  expect(P.parse(P.star(P.or(P.ws1, comment)), ' <!--foo--> <!--bar--> ')).toEqual([
    ' ',
    'foo',
    ' ',
    'bar',
    ' '
  ])
})

test('digit', () => {
  const p = P.map(P.re(/\d/), _ => parseInt(_, 10))
  expect(P.parse(p, '1')).toEqual(1)
  expect(() => P.parse(p, '123')).toThrow('Expected exhaustive result, unparsed 2.')
})

test('convoluted date', () => {
  const digit0: P.t<number> =
    P.map(P.re(/\d/), _ => parseInt(_, 10))
  const dd2: P.t<number> =
    P.refute(P.map(P.seq(digit0, digit0), ([ a, b ]) => (a * 10) + b), R.between(1, 31))
  const mm: P.t<number> =
    P.refute(P.map(P.seq(digit0, digit0), ([ a, b ]) => (a * 10) + b - 1), R.between(0, 11))
  function chars2(chars_: string, min = 1, max = Infinity): P.t<string> {
    return function (reader) {
      let i = 0
      let char = P.Reader.peek(reader, i)
      while (char && chars_.includes(char) && i < max) {
        char = P.Reader.peek(reader, ++i)
      }
      return i >= min ?
        P.Result.eat(reader, i) :
        P.Result.fail(reader, `While char(s) ${chars_} failed for min ${min} (i ${i}).`)
    }
  }
  const intDigits =
    (minChars = 1, maxChars = minChars) =>
      P.map(chars2('0123456789', minChars, maxChars), _ => parseInt(_, 10))
  const yyyy: P.t<number> =
    intDigits(4)
  const p = P.seq(yyyy, mm, dd2)
  expect(digit0(P.Reader.of('0'))).toEqual(P.Result.ok(P.Reader.of('0', 1), 0))
  expect(digit0(P.Reader.of('1'))).toEqual(P.Result.ok(P.Reader.of('1', 1), 1))
  expect(digit0(P.Reader.of('12'))).toEqual(P.Result.ok(P.Reader.of('12', 1), 1))
  expect(P.parse(yyyy, '2021')).toEqual(2021)
  expect(P.parse(mm, '05')).toEqual(4)
  expect(P.parse(dd2, '01')).toEqual(1)
  expect(P.parse(p, '20210501')).toEqual([ 2021, 4, 1 ])
})
