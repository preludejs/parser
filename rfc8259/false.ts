import literal from '../literal.js'
import map from '../map.js'

const false_ =
  map(literal('false'), () => false)

export default false_
