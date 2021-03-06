import charRange from '../char-range.js'
import either from '../either.js'
import join from '../join.js'
import literal from '../literal.js'
import map from '../map.js'
import right from '../right.js'
import sequence from '../sequence.js'
import sorrounded from '../sorrounded.js'
import star from '../star.js'
import times from '../times.js'
import utf8 from '../utf8.js'

export const hexdigit =
  charRange('09afAF')

export const escape =
  literal('\\')

export const escaped =
  right(escape, either(
    utf8('"\\/bfnrt'),
    map(sequence(literal('u'), join(times(4, hexdigit))), _ => String.fromCharCode(parseInt(_[1], 16)))
  ))

const unescaped =
  charRange('\x20\x21\x23\x5b\x5d\uffff') // TODO: 10FFFF

export const char =
  either(unescaped, escaped)

export const quotationMark =
  literal('"')

export const string_ =
  join(sorrounded(quotationMark, quotationMark, star(char)))

export default string_
