import either from '../either.js'
import escaped from './excaped.js'
import nonEscaped from './non-excaped.js'

const field =
  either(escaped, nonEscaped)

export default field
