import literal from '../literal.js'
import separated0 from '../separated0.js'
import between from '../between.js'
import trim from '../trim.js'
import type * as Parser from '../parser.js'
import valueSeparator from './value-separator.js'

export const beginArray =
  trim()(literal('['))

export const endArray =
  trim()(literal(']'))

export function array<T>(parser: Parser.t<T>): Parser.t<T[]> {
  return between(beginArray, endArray, separated0(valueSeparator, parser))
}

export default array
