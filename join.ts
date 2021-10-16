import map from './map.js'
import type P from './parser.js'

const join =
  (a: P<(undefined | string)[]>, glue = ''): P<string> =>
    map(a, _ => _.filter(__ => typeof __ !== 'undefined').join(glue))

export default join
