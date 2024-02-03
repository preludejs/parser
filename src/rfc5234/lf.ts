import lit from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for linefeed.
 */
export const lf =
  lit('\x0a')

export default lf
