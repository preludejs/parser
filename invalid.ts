import type * as Input from './input.js'

class Invalid extends Error {
  input: Input.t
  reason: string
  constructor(input: Input.t, reason: string) {
    super(`At ${input.offset}. ${reason}`)
    this.input = input
    this.reason = reason
  }
}

export default Invalid
