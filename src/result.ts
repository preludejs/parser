import * as Reader from './reader.js'

/** Successful parsing result. */
export type Ok<T = unknown> = {
  reader: Reader.t,
  value: T
  reason?: undefined
}

/** Parsing failure with a reason. */
export type Fail = {
  reader: Reader.t,
  value?: undefined,
  reason: string
}

/** Parser result of some type (default `unknown`). */
export type Result<T = unknown> =
  | Ok<T>
  | Fail

/** Parser result of some type (default `unknown`). */
export type t<T = unknown> =
  Result<T>

/** @returns parsed result with provided value and optional reader advance. */
export const ok =
  <T>(reader: Reader.t, value: T, advance = 0): Ok<T> => ({
    reader: Reader.advanced(reader, advance),
    value
  })

/** @returns `true` if result is a failure, `false` otherwise. */
export const failed =
  (result: Result): result is Fail =>
    result.reason !== undefined

/** @returns consumes `length` number of characters from input, returning it as result value. */
export const eat =
  (reader: Reader.t, length: number): Ok<string> =>
    ok(reader, Reader.slice(reader, 0, length), length)

/** @returns failure result. */
export const fail =
  (reader: Reader.t, reason: string): Fail => ({
    reader: reader,
    reason
  })
