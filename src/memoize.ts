import type { Parser } from './prelude.js'

/** Memoizes parser, can be used for mutually recursive parsers. */
const memoize =
  <P extends Parser<unknown>>(f: () => P) => {
    const g = f()
    return input => g(input)
  }

export default memoize
