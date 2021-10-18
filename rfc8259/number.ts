import charRange from '../char-range.js'
import either from '../either.js'
import join from '../join.js'
import literal from '../literal.js'
import map from '../map.js'
import maybe from '../maybe.js'
import sequence from '../sequence.js'
import star from '../star.js'
import utf8 from '../utf8.js'

export const decimalPoint =
  literal('.')

export const digit =
  charRange('09')

export const digit19 =
  charRange('19')

export const e =
  utf8('eE')

const int =
  either(
    literal('0'),
    join(sequence(digit19, join(star(digit))))
  )

const minus =
  literal('-')

export const plus =
  literal('+')

export const exp =
  join(sequence(e, maybe(either(minus, plus)), join(star(digit, 1))))

export const frac =
  join(sequence(decimalPoint, join(star(digit, 1))))

export const number_ =
  map(join(sequence(maybe(minus), int, maybe(frac), maybe(exp))), parseFloat)

export default number_
