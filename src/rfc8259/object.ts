import literal from '../literal.js'
import sorrounded from '../sorrounded.js'
import string_ from './string.js'
import trim from '../trim.js'
import type * as Parser from '../parser.js'
import map from '../map.js'
import separated0 from '../separated0.js'
import sequence from '../sequence.js'
import valueSeparator from './value-separator.js'

export const beginObject =
  trim()(literal('{'))

export const endObject =
  trim()(literal('}'))

export const nameSeparator =
  trim()(literal(':'))

export const member =
  <T>(value: Parser.t<T>): Parser.t<[string, undefined | T]> =>
    map(sequence(string_, nameSeparator, value), _ => [_[0], _[2]])

export const object_ =
  <T>(value: Parser.t<T>): Parser.t<Record<string, undefined | T>> =>
    map(sorrounded(beginObject, endObject, separated0(valueSeparator, member(value))), _ => Object.fromEntries(_))

export default object_
