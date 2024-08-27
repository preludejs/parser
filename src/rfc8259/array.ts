import sep0 from '../sep0.js'
import trim from '../trim.js'
import type * as Parser from '../parser.js'
import valueSeparator from './value-separator.js'
import seq from '../seq.js'
import map from '../map.js'

export const beginArray =
  trim()('[')

export const endArray =
  trim()(']')

export const array =
  <T>(parser: Parser.t<T>): Parser.t<T[]> =>
    map(seq(beginArray, sep0(valueSeparator, parser), endArray), _ => _[1])

export default array
