import type { Parser } from './prelude.js'
import map from './map.js'

/** Joins `string` (or `undefined`) result array into single `string` result. */
const join =
  (a: Parser<(undefined | string)[]>, glue = ''): Parser<string> =>
    map(a, _ => _.filter(__ => typeof __ !== 'undefined').join(glue))

export default join
