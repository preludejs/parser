import * as Rfc8259 from './rfc8259.js'
import charRanges from './char-ranges.js'
import either from './either.js'
import sorrounded from './sorrounded.js'
import exhaustive from './exhaustive.js'
import join from './join.js'
import literal from './literal.js'
import map from './map.js'
import separated0 from './separated0.js'
import star from './star.js'
import trim from './trim.js'
import type P from './parser.js'
import ws1 from './ws1.js'

export type Sexp = string | Sexp[]

export type t = Sexp

export const unquoted =
  join(star(charRanges(['a', 'z'], ['A', 'Z'], ['0', '9']), 1))

export const string =
  either(
    unquoted,
    map(Rfc8259.string_, _ => _.value)
  )

export const lparen =
  trim(literal('('))

export const rparen =
  trim(literal(')'))

export const sexp: P<Sexp> =
  input =>
    sorrounded(lparen, rparen, separated0(ws1, either(string, sexp)))(input)

export const parse =
  exhaustive(sexp)
