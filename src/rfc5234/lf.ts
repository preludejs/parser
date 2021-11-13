import literal from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for linefeed.
 */
const lf =
  literal('\x0a')

export default lf
