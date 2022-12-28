import type * as Reader from './reader.js'
import type * as Result from './result.js'

export type Parser<T> =
  (reader: Reader.t) =>
    Result.t<T>

export type t<T> =
  Parser<T>

export type Parsed<T> =
  T extends Parser<infer R> ?
    R :
    never
