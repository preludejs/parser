import type { Parser } from './prelude.js'

/** Memoizes parser, can be used for mutually recursive parsers. */
const lazy =
  <P extends Parser<unknown>>(f: () => P): P => {
    let parser: P
    return (
      input => {
        if (typeof parser === 'undefined') {
          parser = f()
        }
        return parser(input)
      }
    ) as P
  }

export default lazy
