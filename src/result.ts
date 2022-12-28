import * as Reader from './reader.js'

/** Represents successful parsing result. */
export type Ok<T> = {
  input: Reader.t,
  value: T
  reason?: undefined
}

/** Represents parsing failure. */
export type Fail = {
  input: Reader.t,
  value?: undefined,
  reason: string
}

export type Result<T> =
  | Ok<T>
  | Fail

export type t<T> =
  Result<T>

/** @returns parsed result with provided value and optional reader advance. */
export const ok =
  <T>(reader: Reader.t, value: T, advance = 0): Ok<T> => ({
    input: {
      input: reader.input,
      offset: reader.offset + advance
    },
    value
  })

/** @returns `true` if result is a failure, `false` otherwise. */
export const failed =
  <T>(result: Result<T>): result is Fail =>
    result.reason !== undefined

/** @returns consumes `length` number of characters from input, returning it as result value. */
export const eat =
  (reader: Reader.t, length: number): Ok<string> =>
    ok(reader, Reader.slice(reader, 0, length), length)

/** @returns failure result. */
export const fail =
  (input: Reader.t, reason: string): Fail => ({
    input,
    reason
  })
