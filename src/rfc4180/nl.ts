import literal from '../literal.js'
import either from '../either.js'

export const nl =
  either(literal(`\n`), literal('\r\n'))

export default nl
