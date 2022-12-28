import type * as Parser from './parser.js'

/** Memoizes parser, can be used for mutually recursive parsers. */
const lazy =
  <P extends Parser.t<unknown>>(f: () => P): P => {
    let parser: P
    return (
      reader => {
        if (typeof parser === 'undefined') {
          parser = f()
        }
        return parser(reader)
      }
    ) as P
  }

export default lazy
