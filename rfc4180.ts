/**
 * @module Rfc4180
 *
 * @description Common Format and MIME Type for Comma-Separated Values (CSV) Files
 *
 * @see https://datatracker.ietf.org/doc/html/rfc4180
 *
 * @example abnf
 *
 *   file = [header CRLF] record *(CRLF record) [CRLF]
 *
 *   header = name *(COMMA name)
 *
 *   record = field *(COMMA field)
 *
 *   name = field
 *
 *   field = (escaped / non-escaped)
 *
 *   escaped = DQUOTE *(TEXTDATA / COMMA / CR / LF / 2DQUOTE) DQUOTE
 *
 *   non-escaped = *TEXTDATA
 *
 *   COMMA = %x2C
 *
 *   CR = %x0D ;as per section 6.1 of RFC 2234 [2]
 *
 *   DQUOTE =  %x22 ;as per section 6.1 of RFC 2234 [2]
 *
 *   LF = %x0A ;as per section 6.1 of RFC 2234 [2]
 *
 *   CRLF = CR LF ;as per section 6.1 of RFC 2234 [2]
 *
 *   TEXTDATA =  %x20-21 / %x23-2B / %x2D-7E
 */

import charRange from './char-range'
import either from './either.js'
import exhaustive from './exhaustive.js'
import join from './join.js'
import literal from './literal.js'
import map from './map.js'
import separated1 from './separated1.js'
import sorrounded1 from './sorrounded1.js'
import star from './star.js'
import trim from './trim.js'
import union from './union.js'

export const dquote = literal('"')
export const _2dquote = literal('""')
export const lf = literal('\n')
export const cr = literal('\r')
export const cr0lf = either(literal(`\n`), literal('\r\n'))
export const textdata = charRange('\x20\x21\x23\x2b\x2d\x7e')
export const comma = literal(',')
export const nonEscaped = join(star(textdata))
export const escaped = sorrounded1(dquote, join(star(union(textdata, comma, cr, lf, map(_2dquote, () => '"')))))
export const field = either(escaped, nonEscaped)
export const record = separated1(comma, field)
export const file = separated1(cr0lf, record)
export const parse = exhaustive(trim(file))
