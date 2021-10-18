import literal from '../literal.js'
import separated0 from '../separated0.js'
import sorrounded from '../sorrounded.js'
import trim from '../trim.js'
import type { Parser } from '../prelude.js'
import valueSeparator from './value-separator.js'

export const beginArray =
  trim(literal('['))

export const endArray =
  trim(literal(']'))

export const array =
  <T>(value: Parser<T>): Parser<T[]> =>
    sorrounded(beginArray, endArray, separated0(valueSeparator, value))

export default array
