import charRange from '../char-range.js'
import either from '../either.js'
import join from '../join.js'
import lit from '../literal.js'
import map from '../map.js'
import maybe from '../maybe.js'
import sequence from '../sequence.js'
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
    join(sequence(digit19, join(star(digit))))
  )

export const minus =
  lit('-')

export const plus =
  lit('+')

export const exp =
  join(sequence(e, maybe(either(minus, plus)), join(star(digit, 1))))

export const frac =
  join(sequence(decimalPoint, join(star(digit, 1))))

const number_ =
  map(join(sequence(maybe(minus), int, maybe(frac), maybe(exp))), parseFloat)

export { number_ as number }

export default number_
