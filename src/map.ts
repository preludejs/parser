import * as Result from './result.js'
import type * as Parser from './parser.js'

export default function map<A, B>(a: Parser.t<A>, f: (value: A) => B): Parser.t<B> {
  return function (input) {
    const a_ = a(input)
    return Result.failed(a_) ?
      a_ :
      Result.ok(a_.input, f(a_.value))
  }
}
