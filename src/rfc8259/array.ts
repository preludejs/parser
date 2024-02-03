import sep0 from '../sep0.js'
import between from '../between.js'
import trim from '../trim.js'
import type * as Parser from '../parser.js'
import valueSeparator from './value-separator.js'

export const beginArray =
  trim()('[')

export const endArray =
  trim()(']')

export const array =
  <T>(parser: Parser.t<T>): Parser.t<T[]> =>
    between(beginArray, endArray, sep0(valueSeparator, parser))

export default array
