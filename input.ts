export type Input = {
  string: string,
  offset: number
}

export type t = Input

export const of =
  (string: string, index = 0): Input => ({
    string,
    offset: index
  })

export const clone =
  (input: Input): Input => ({
    string: input.string,
    offset: input.offset
  })

export const remaining =
  (input: Input): string =>
    input.string.slice(input.offset)

export const remainingLength =
  (input: Input): number =>
    input.string.length - input.offset

export const unsafeAt =
  (input: Input, offset = 0): string =>
    input.string[input.offset + offset]

export const slice =
  (input: Input, start: number, end: number) =>
    input.string.slice(input.offset + start, input.offset + end)

export const end =
  (input: Input): boolean =>
    input.offset >= input.string.length

export const startsWith =
  (input: Input, expected: string): boolean =>
    input.string.startsWith(expected, input.offset)

export const advance =
  (input: Input, length = 1): void => {
    input.offset += length
  }

export const advanced =
  (input: Input, length = 1): Input => ({
    string: input.string,
    offset: input.offset + length
  })
