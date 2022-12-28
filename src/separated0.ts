import * as Result from './result.js'
import separated1 from './separated1.js'
import type * as Parser from './parser.js'

export function separated0<A>(s: Parser.t<unknown>, a: Parser.t<A>): Parser.t<A[]> {
  return function (reader) {
    const a_ = separated1(s, a)(reader)
    return Result.failed(a_) ?
      Result.ok(reader, []) :
      a_
  }
}

export default separated0
