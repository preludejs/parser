import type * as Parser from './parser.js'
import type * as Reader from './reader.js'
import * as Result from './result.js'

const reentry = new WeakMap<Reader.t, Set<Parser.t<unknown>>>()

export const longest =
  <T extends Parser.t<unknown>[]>(...as: T): Parser.t<Parser.Parsed<T[number]>> =>
    reader => {
      const set = reentry.get(reader) ?? reentry.set(reader, new Set).get(reader)!
      let r: undefined | Result.Ok<unknown> = undefined
      for (const a of as) {
        if (set.has(a)) {
          continue
        }
        set.add(a)
        const a_ = a(reader)
        set.delete(a)
        if (!Result.failed(a_)) {
          if (r === undefined || r.reader.offset < a_.reader.offset) {
            r = a_
          }
        }
      }
      return r !== undefined ?
        r as Result.Ok<Parser.Parsed<T[number]>> :
        Result.fail(reader, `None of ${as.length} alternatives matched at ${reader.offset}.`)
    }

export default longest
