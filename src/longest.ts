import type * as Parser from './parser.js'
import type * as Reader from './reader.js'
import * as Result from './result.js'

const reentry = new WeakMap<Reader.t, Set<Parser.t<unknown>>>()

const longest =
  <T extends Parser.t<unknown>[]>(...as: T): Parser.t<Parser.Parsed<T[number]>> =>
    input => {
      const set = reentry.get(input) ?? reentry.set(input, new Set).get(input)!
      let r: undefined | Result.Ok<unknown> = undefined
      for (const a of as) {
        if (set.has(a)) {
          continue
        }
        set.add(a)
        const a_ = a(input)
        set.delete(a)
        if (!Result.failed(a_)) {
          if (r === undefined || r.input.offset < a_.input.offset) {
            r = a_
          }
        }
      }
      return r !== undefined ?
        r as Result.Ok<Parser.Parsed<T[number]>> :
        Result.fail(input, `None of ${as.length} alternatives matched at ${input.offset}.`)
    }

export default longest
