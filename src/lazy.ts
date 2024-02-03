import type * as Parser from './parser.js'

/** Memoizes parser, can be used for mutually recursive parsers. */
export function lazy<P extends Parser.t>(f: () => P): P {
  let parser: P
  return function (reader) {
    if (typeof parser === 'undefined') {
      parser = f()
    }
    return parser(reader)
  } as P
}

export default lazy
