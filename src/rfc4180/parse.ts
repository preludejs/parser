import exhaustive from '../exhaustive.js'
import file from './file.js'
import trim from '../trim.js'

const parse =
  exhaustive(trim()(file))

export default parse
