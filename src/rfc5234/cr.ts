import literal from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for carriage return.
 */
export const cr =
  literal('\x0d')

export default cr
