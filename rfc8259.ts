import charRange from './char-range.js'
import either from './either.js'
import enclosed from './enclosed.js'
import exhaustive from './exhaustive.js'
import join from './join.js'
import literal from './literal.js'
import map from './map.js'
import maybe from './maybe.js'
import right from './right.js'
import separated0 from './separated0.js'
import sequence from './sequence.js'
import star from './star.js'
import times from './times.js'
import type P from './parser.js'
import union from './union.js'
import utf8 from './utf8.js'
import whileChar from './while-char.js'

export type JsonNull = { type: 'null' }

export type JsonFalse = { type: 'false' }

export type JsonTrue = { type: 'true' }

export type JsonNumber = { type: 'number', value: string }

export type JsonString = { type: 'string', value: string }

export type Json = JsonNull | JsonFalse | JsonTrue | JsonNumber | JsonString | JsonArray | JsonObject

export interface JsonArray {
  type: 'array',
  elements: Json[]
}

export interface JsonObject {
  type: 'object',
  members: [string, Json][]
}

export const ws =
  whileChar('\x20\x09\x0a\x0d')

export const trim =
  <A>(a: P<A>): P<A> =>
    map(sequence(ws, a, ws), _ => _[1])

const false_: P<JsonFalse> =
  map(literal('false'), () => ({ type: 'false' as const }))

export { false_ as false }

const null_: P<JsonNull> =
  map(literal('null'), () => ({ type: 'null' as const }))

export { null_ as null }

const true_: P<JsonTrue> =
  map(literal('true'), () => ({ type: 'true' as const }))

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
    literal('0'),
    join(sequence(digit19, join(star(digit))))
  )

export const frac =
  join(sequence(decimalPoint, join(star(digit, 1))))

export const number: P<JsonNumber> =
  map(join(sequence(maybe(minus), int, maybe(frac), maybe(exp))), _ => ({ type: 'number' as const, value: _ }))

export const unescaped =
  union(
    charRange('\x20', '\x21'),
    charRange('\x23', '\x5b'),
    charRange('\x5d', '\uffff') // TODO: 10FFFF
  )

export const hexdig =
  either(digit, utf8('ABCDEF')) // TODO: a-f?

export const escaped =
  right(escape, either(
    utf8('"\\/bfnrt'),
    map(sequence(literal('u'), join(times(4, hexdig))), _ => String.fromCharCode(parseInt(_[1], 16)))
  ))

export const char =
  either(unescaped, escaped)

export const string_: P<JsonString> =
  map(join(enclosed(quotationMark, quotationMark, star(char))), _ => ({ type: 'string' as const, value: _ }))

export const value: P<JsonNull | JsonFalse | JsonTrue | JsonNumber | JsonString | JsonArray | JsonObject> =
  input =>
    union(false_, null_, true_, object, array, number, string_)(input)

export const member =
  map(sequence(string_, nameSeparator, value), _ => [_[0].value, _[2]] as [string, Json])

export const array: P<JsonArray> =
  map(enclosed(beginArray, endArray, separated0(valueSeparator, value)), _ => ({ type: 'array', elements: _ }))

export const object: P<JsonObject> =
  map(enclosed(beginObject, endObject, separated0(valueSeparator, member)), _ => ({ type: 'object', members: _ }))

export const json =
  trim(value)

export const parse =
  exhaustive(json)
