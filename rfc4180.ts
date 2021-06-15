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

import charRanges from './char-ranges'
import either from './either'
import exhaustive from './exhaustive'
import join from './join'
import literal from './literal'
import map from './map'
import separated1 from './separated1'
import sorrounded1 from './sorrounded1'
import star from './star'
import trim from './trim'
import union from './union'

export const dquote = literal('"')
export const _2dquote = literal('""')
export const lf = literal('\n')
export const cr = literal('\r')
export const cr0lf = either(literal(`\n`), literal('\r\n'))
export const textdata = charRanges(['\x20', '\x21'], ['\x23', '\x2b'], ['\x2d', '\x7e'])
export const comma = literal(',')
export const nonEscaped = join(star(textdata))
export const escaped = sorrounded1(dquote, join(star(union(textdata, comma, cr, lf, map(_2dquote, () => '"')))))
export const field = either(escaped, nonEscaped)
export const record = separated1(comma, field)
export const file = separated1(cr0lf, record)
export const parse = exhaustive(trim(file))
