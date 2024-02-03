import lit from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for horizontal tab.
 */
export const htab =
  lit('\x09')

export default htab
