import between from '../between.js'
import string_ from './string.js'
import trim from '../trim.js'
import type * as Parser from '../parser.js'
import map from '../map.js'
import separated0 from '../separated0.js'
import seq from '../sequence.js'
import valueSeparator from './value-separator.js'

export const beginObject =
  trim()('{')

export const endObject =
  trim()('}')

export const nameSeparator =
  trim()(':')

export const member =
  <T>(value: Parser.t<T>): Parser.t<[string, undefined | T]> =>
    map(seq(string_, nameSeparator, value), _ => [_[0], _[2]])

export const object =
  <T>(value: Parser.t<T>): Parser.t<Record<string, undefined | T>> =>
    map(between(beginObject, endObject, separated0(valueSeparator, member(value))), _ => Object.fromEntries(_))

export default object
