

/** @returns `true` if string `input` includes string `value`, `false` otherwise. */
export const includes =
  (input: string, value: undefined | string): boolean =>
    value ?
      input.includes(value) :
      false
