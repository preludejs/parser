import sep1 from '../sep1.js'
import comma from './comma.js'
import field from './field.js'

export const record =
  sep1(comma, field)

export default record
