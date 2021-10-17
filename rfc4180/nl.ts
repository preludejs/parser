import literal from '../literal.js'
import either from '../either.js'

const nl =
  either(literal(`\n`), literal('\r\n'))

export default nl
