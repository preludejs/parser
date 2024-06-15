import * as Reader from './reader.js'
import * as Parser from './parser.js'

const reentry = new WeakMap<Reader.t, Set<Parser.t>>()

export const enter =
  (reader: Reader.t, parser: Parser.t) => {
    const seen = reentry.get(reader)
    if (seen == null) {
      reentry.set(reader, new Set([ parser ]))
      return true
    }
    if (!seen.has(parser)) {
      seen.add(parser)
      return true
    }
    return false
  }

export const leave =
  (reader: Reader.t, parser: Parser.t) =>
    reentry.get(reader)?.delete(parser) ?? false

export const guard =
  (reader: Reader.t, parser: Parser.t, f: () => void) => {
    if (enter(reader, parser)) {
      try {
        f()
      } finally {
        leave(reader, parser)
      }
    }
  }
