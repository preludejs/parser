import type * as Parser from './parser.js'
import map from './map.js'

/** Joins result array of optional strings into single string using separator (default empty string). */
export function join(parser: Parser.t<(undefined | string)[]>, separator = ''): Parser.t<string> {
  return map(parser, values => values.filter(value => typeof value !== 'undefined').join(separator))
}

export default join
