import lit from '../lit.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for carriage return.
 */
export const cr =
  lit('\x0d')

export default cr
