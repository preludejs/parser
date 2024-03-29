import * as Reader from './reader.js'

/** Successful parsing result. */
export type Ok<T = unknown> = {
  reader: Reader.t,
  value: T,
  length: number,
  reason?: undefined
}

/** Parsing failure with a reason. */
export type Fail = {
  reader: Reader.t,
  value?: undefined,

  /** May indicate furthest read that happened, otherwise 0. */
  length: number,

  reason: string
}

/** Parser result of some type (default `unknown`). */
export type Result<T = unknown> =
  | Ok<T>
  | Fail

/** Parser result of some type (default `unknown`). */
export type t<T> =
  Result<T>

/**
 * @returns parsed result with provided value and optional reader advance.
 * @param length negative value won't advance offset, length will be positive (denotes backward match).
 */
export const ok =
  <T>(reader: Reader.t, length: number, value: T): Ok<T> => ({
    reader: Reader.advanced(reader, Math.max(0, length)),
    value,
    length: Math.abs(length)
  })

/** @returns `true` if result is a failure, `false` otherwise. */
export const failed =
  (result: Result): result is Fail =>
    result.reason !== undefined

/** @returns consumes `length` number of characters from input, returning it as result value. */
export const eat =
  (reader: Reader.t, length: number): Ok<string> =>
    ok(reader, length, Reader.slice(reader, 0, length))

/** @returns failure result. */
export const fail =
  (reader: Reader.t, length: number, reason: string): Fail => ({
    reader,
    length,
    reason
  })
