import array from './array.js'
import false_ from './false.js'
import null_ from './null.js'
import number_ from './number.js'
import object_ from './object.js'
import string_ from './string.js'
import trim from '../trim.js'
import true_ from './true.js'
import union from '../union.js'

export const value =
  input =>
    union(false_, null_, true_, object_(value), array(value), number_, string_)(input)

export const json =
  trim(value)

export default json
