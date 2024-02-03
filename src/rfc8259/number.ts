import charRange from '../char-range.js'
import either from '../either.js'
import join from '../join.js'
import lit from '../lit.js'
import map from '../map.js'
import maybe from '../maybe.js'
import seq from '../seq.js'
import star from '../star.js'
import chars from '../chars.js'

export const decimalPoint =
  lit('.')

export const digit =
  charRange('09')

export const digit19 =
  charRange('19')

export const e =
  chars('eE')

export const int =
  either(
    '0',
    join(seq(digit19, join(star(digit))))
  )

export const minus =
  lit('-')

export const plus =
  lit('+')

export const exp =
  join(seq(e, maybe(either(minus, plus)), join(star(digit, 1))))

export const frac =
  join(seq(decimalPoint, join(star(digit, 1))))

export const number =
  map(join(seq(maybe(minus), int, maybe(frac), maybe(exp))), parseFloat)

export default number
