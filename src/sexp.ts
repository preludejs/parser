import * as Parser from './parser.js'
import between from './between.js'
import charRange from './char-range.js'
import either from './either.js'
import join from './join.js'
import jsonString from './rfc8259/string.js'
import literal from './literal.js'
import separated0 from './separated0.js'
import star from './star.js'
import trim from './trim.js'
import type * as Reader from './reader.js'
import type * as Result from './result.js'
import ws1 from './ws1.js'

export type Sexp =
  string | Sexp[]

export type t =
  Sexp

export const lparen =
  trim()(literal('('))

export const rparen =
  trim()(literal(')'))

export const unquoted =
  join(star(charRange('09azAZ'), 1))

export const string_: Parser.t<string> =
  either(unquoted, jsonString)

export function sexp(reader: Reader.t): Result.t<Sexp> {
  return between(lparen, rparen, separated0(ws1, either(string_, sexp)))(reader)
}

export const parser =
  Parser.parser(sexp)

export default parser
