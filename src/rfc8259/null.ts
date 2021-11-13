import literal from '../literal.js'
import map from '../map.js'

const null_ =
  map(literal('null'), () => null)

export default null_
