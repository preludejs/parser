import * as Parser from '../parser.js'
import file from './file.js'
import trim from '../trim.js'

export const parser =
  Parser.parser(trim()(file))

export default parser
