import either from '../either.js'
import escaped from './escaped.js'
import nonEscaped from './non-excaped.js'

export const field =
  either(escaped, nonEscaped)

export default field
