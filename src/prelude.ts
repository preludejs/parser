export type Input = {
  input: string,
  offset: number
}

export type Ok<T> = {
  input: Input,
  value: T
  reason?: undefined
}

export type Fail = {
  input: Input,
  value?: undefined,
  reason: string
}

export type Result<T> =
  | Ok<T>
  | Fail

export type Parser<T> =
  (input: Input) =>
    Result<T>

export type t<T> =
  Parser<T>

export type Parsed<T> =
  T extends Parser<infer R> ?
    R :
    never

/** @returns `true` if string `input` includes string `value`, `false` otherwise. */
export const includes =
  (input: string, value: undefined | string): boolean =>
    value ?
      input.includes(value) :
      false

/** @returns `true` if end of input has been reached, `false` otherwise. */
export const end =
  (input: Input) =>
    input.input.length <= input.offset

/** @returns ok result. */
export const ok =
  <T>({ input, offset }: Input, value: T, advance = 0): Ok<T> => ({
    input: {
      input,
      offset: offset + advance
    },
    value
  })

/** @returns consumes `length` number of characters from input, returning it as result value. */
export const eat =
  ({ input, offset }: Input, length: number): Ok<string> => ({
    input: {
      input,
      offset: offset + length
    },
    value: input.slice(offset, offset + length)
  })

/** @returns failure result. */
export const fail =
  (input: Input, reason: string): Fail => ({
    input,
    reason
  })

/** @returns `true` if result is a failure, `false` otherwise. */
export const failed =
  <T>(result: Result<T>): result is Fail =>
    result.reason !== undefined

/** @returns character at `offset` from current input position, `undefined` if out of bound. */
export const peek =
  (input: Input, offset = 0): undefined | string =>
    input.input[input.offset + offset]

/** @returns `true` if input starts with provided `prefix`, `false` otherwise. */
export const startsWith =
  ({ input, offset }: Input, prefix: string, position = 0): boolean =>
    input.startsWith(prefix, offset + position)

/** @returns -1 if not found, otherwise offset of value. */
export const offsetOf =
  ({ input, offset }: Input, value: string, position = 0): number =>
    input.indexOf(value, offset + position)

/** @returns rest of input. */
export const rest =
  (input: Input): string =>
    input.input.slice(input.offset)

export const slice =
  (input: Input, start: number, end: number): string =>
    input.input.slice(start + input.offset, end + input.offset)
