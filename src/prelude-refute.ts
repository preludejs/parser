import { inspect } from 'node:util'

export type Ok<T> = {
  status: 'ok',
  value: T,
}

export type Fail = {
  status: 'refuted',
  reason: string,
  received: unknown
}

export type Result<T> =
  | Ok<T>
  | Fail

export type Refute<T> =
  (value: unknown) =>
    Result<T>

export type t<T> =
  Refute<T>

/** @returns `true` if provided `result` is failure, `false` otherwise. */
export const failed =
  (result: Result<unknown>): result is Fail =>
    result.status === 'refuted'

/** @return failure reason without inspecting received value. */
export const reasonWithoutReceived =
  (failure: Fail): string =>
    `Invalid value ${failure.reason}.`

/** @return failure reason with inspecting received value. */
export const reasonWithReceived =
  (failure: Fail): string =>
    `Invalid value ${failure.reason}, got ${inspect(failure.received)}.`
