export type Reader = {
  input: string,
  offset: number
}

export type t =
  Reader

/** @returns reader from input string and optional offset (defaults to 0). */
export const of =
  (input: string, offset = 0): Reader => ({
    input,
    offset
  })

export const advanced =
  (reader: Reader, advance: number): Reader => ({
    input: reader.input,
    offset: reader.offset + advance
  })

/** @returns character at `offset` from current input position, `undefined` if out of bound. */
export const peek =
  (reader: Reader, offset = 0): undefined | string =>
    reader.input[reader.offset + offset]

/** @returns `true` if input starts with provided `prefix`, `false` otherwise. */
export const startsWith =
  (reader: Reader, prefix: string, position = 0): boolean =>
    reader.input.startsWith(prefix, reader.offset + position)

/** @returns -1 if not found, otherwise offset of value. */
export const offsetOf =
  (reader: Reader, value: string, position = 0): number =>
    reader.input.indexOf(value, reader.offset + position)

/** @returns rest of input. */
export const rest =
  (reader: Reader): string =>
    reader.input.slice(reader.offset)

export const slice =
  (reader: Reader, start: number, end: number): string =>
    reader.input.slice(start + reader.offset, end + reader.offset)

/** @returns `true` if end of input has been reached, `false` otherwise. */
export const end =
  (reader: Reader) =>
    reader.input.length <= reader.offset
