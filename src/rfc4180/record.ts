import separated1 from '../separated1.js'
import comma from './comma.js'
import field from './field.js'

export const record =
  separated1(comma, field)

export default record
