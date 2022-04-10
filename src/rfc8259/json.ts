import array from './array.js'
import false_ from './false.js'
import null_ from './null.js'
import number_ from './number.js'
import object_ from './object.js'
import string_ from './string.js'
import trim from '../trim.js'
import true_ from './true.js'
import first from '../first.js'

export const value =
  input =>
    first(
      string_,
      number_,
      null_,
      true_,
      false_,
      object_(value),
      array(value)
    )(input)

export const json =
  trim(value)

export default json
