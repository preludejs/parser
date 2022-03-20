export type Input = readonly [ input: string, offset: number ]
export type Ok<T> = readonly [ input: Input, value: T, reason: undefined ]
export type Fail = readonly [ input: Input, value: undefined, reason: string ]
export type Result<T> = Ok<T> | Fail
export type Parser<T> = (input: Input) => Result<T>
export type ResultOfParser<T> = T extends Parser<infer R> ? R : never

/** @returns `true` if string `input` includes string `value`, `false` otherwise. */
export const includes =
  (input: string, value: undefined | string): boolean =>
    value ?
      input.includes(value) :
      false

/** @returns `true` if end of input has been reached, `false` otherwise. */
export const end =
  (input: Input) =>
    input[0].length <= input[1]

/** @returns ok result. */
export const ok =
  <T>(input: Input, value: T, advance = 0): Ok<T> =>
    [ [ input[0], input[1] + advance ], value, undefined ]

/** @returns consumes `length` number of characters from input, returning it as result value. */
export const eat =
  (input: Input, length: number): Ok<string> =>
    [ [ input[0], input[1] + length ], input[0].slice(input[1], input[1] + length), undefined ]

/** @returns failure result. */
export const fail =
  (input: Input, reason: string): Fail =>
    [ input, undefined, reason ]

/** @returns `true` if result is a failure, `false` otherwise. */
export const failed =
  <T>(result: Result<T>): result is Fail =>
    result[2] !== undefined

/** @returns character at `offset` from current input position, `undefined` if out of bound. */
export const peek =
  (input: Input, offset = 0): undefined | string =>
    input[0][input[1] + offset]

/** @returns `true` if input starts with provided `prefix`, `false` otherwise. */
export const startsWith =
  (input: Input, prefix: string): boolean =>
    input[0].startsWith(prefix, input[1])

/** @returns rest of input. */
export const rest =
  (input: Input): string =>
    input[0].slice(input[1])
