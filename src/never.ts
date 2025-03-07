import type * as P from './parser.js'
import * as Result from './result.js'

export const never: P.Parser<never> =
  reader =>
    Result.fail(reader, 'Expected never parser to not be called.')

export default never
