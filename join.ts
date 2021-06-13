import map from './map'
import type P from './parser'

const join =
  (a: P<(undefined | string)[]>, glue = ''): P<string> =>
    map(a, _ => _.filter(__ => typeof __ !== 'undefined').join(glue))

export default join
