import * as P from './parser.js'
import charRange from './char-range.js'
import either from './either.js'
import join from './join.js'
import jsonString from './rfc8259/string.js'
import map from './map.js'
import sep0 from './sep0.js'
import seq from './seq.js'
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
  trim()('(')

export const rparen =
  trim()(')')

export const unquoted =
  join(star(charRange('09azAZ'), 1))

export const string: P.t<string> =
  either(unquoted, jsonString)

export function sexp(reader: Reader.t): Result.t<Sexp> {
  return map(seq(lparen, sep0(ws1, either(string, sexp)), rparen), _ => _[1])(reader)
}

export const parser =
  P.parser(sexp)

export default parser
