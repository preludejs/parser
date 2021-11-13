import literal from '../literal.js'
import map from '../map.js'

const true_ =
  map(literal('true'), () => true)

export default true_
