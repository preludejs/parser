import map from './map.js'
import sequence from './sequence.js'
import type P from './parser'
import whileChar from './while-char.js'
import literal from './literal.js'
import enclosed from './enclosed.js'
import separated0 from './separated0.js'
import either from './either.js'
import charRange from './char-range.js'
import maybe from './maybe.js'
import star from './star.js'
import ascii from './ascii.js'
import union from './union.js'
import times from './times.js'
import right from './right.js'
import join from './join.js'

export const ws =
  whileChar('\x20\x09\x0a\x0d')

export const trim =
  <A>(a: P<A>): P<A> =>
    map(sequence(ws, a, ws), _ => _[1])

const false_ =
  map(literal('false'), () => ({ type: '@prelude/parser/rfc8259/False' }))

export { false_ as false }

const null_ =
  map(literal('null'), () => ({ type: '@prelude/parser/rfc8259/Null' }))

export { null_ as null }

const true_ =
  map(literal('true'), () => ({ type: '@prelude/parser/rfc8259/True' }))

export { true_ as true }

export const beginArray =
  trim(literal('['))

export const beginObject =
  trim(literal('{'))

export const endArray =
  trim(literal(']'))

export const endObject =
  trim(literal('}'))

export const nameSeparator =
  trim(literal(':'))

export const valueSeparator =
  trim(literal(','))

export const zero =
  literal('0')

export const plus =
  literal('+')

export const minus =
  literal('-')

export const decimalPoint =
  literal('.')

export const quotationMark =
  literal('"')

export const escape =
  literal('\\')

export const digit =
  charRange('0', '9')

export const digit19 =
  charRange('1', '9')

export const e =
  either(literal('e'), literal('E'))

export const exp =
  join(sequence(e, maybe(either(minus, plus)), join(star(digit, 1))))

export const int =
  either(
    zero,
    join(sequence(digit19, join(star(digit))))
  )

export const frac =
  join(sequence(decimalPoint, join(star(digit, 1))))

export const number =
  map(join(sequence(maybe(minus), int, maybe(frac), maybe(exp))), _ => ({ type: '@prelude/parser/rfc8259/Number', value: _ }))

export const unescaped =
  union(
    charRange('\x20', '\x21'),
    charRange('\x23', '\x5b'),
    charRange('\x5d', '\uffff') // TODO: 10FFFF
  )

export const hexdig =
  either(digit, ascii('ABCDEF')) // TODO: a-f?

export const escaped =
  right(escape, either(
    ascii('"\\/bfnrt'),
    map(sequence(literal('u'), join(times(4, hexdig))), _ => String.fromCharCode(parseInt(_[1], 16)))
  ))

export const char =
  either(unescaped, escaped)

export const string =
  map(join(enclosed(quotationMark, quotationMark, star(char))), _ => ({ type: '@prelude/parser/rfc8259/String', value: _ }))

export const value =
  input =>
    union(false_, null_, true_, object, array, number, string)(input)

export const member =
  map(sequence(string, nameSeparator, value), _ => ({ type: '@prelude/parser/rfc8259/Member', name: _[0], value: _[2] }))

export const array =
  map(enclosed(beginArray, endArray, separated0(valueSeparator, value)), _ => ({ type: '@prelude/parser/rfc8259/Array', values: _ }))

export const object =
  map(enclosed(beginObject, endObject, separated0(valueSeparator, member)), _ => ({ type: '@prelude/parser/rfc8259/Object', members: _ }))

export const jsonText =
  trim(value)
