import type * as Parser from './parser.js'
import map from './map.js'

/** Joins `string` (or `undefined`) result array into single `string` result. */
const join =
  (a: Parser.t<(undefined | string)[]>, glue = ''): Parser.t<string> =>
    map(a, _ => _.filter(__ => typeof __ !== 'undefined').join(glue))

export default join
