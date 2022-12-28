import * as Result from './result.js'
import type * as Parser from './parser.js'

export function map<A, B>(parser: Parser.t<A>, f: (value: A) => B): Parser.t<B> {
  return function (reader) {
    const result = parser(reader)
    return Result.failed(result) ?
      result :
      Result.ok(result.reader, f(result.value))
  }
}

export default map
