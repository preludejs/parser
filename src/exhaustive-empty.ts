import { ok, fail, rest } from './prelude.js'

/** @returns parser that matches empty string exhaustively. */
const exhaustiveEmpty =
  input =>
    rest(input) === '' ?
      ok(input, null) :
      fail(input, 'Non-empty string.')

export default exhaustiveEmpty
