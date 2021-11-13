import literal from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for horizontal tab.
 */
const htab =
  literal('\x09')

export default htab
