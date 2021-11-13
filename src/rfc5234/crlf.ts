import literal from '../literal.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for Internet standard newline.
 */
const crlf =
  literal('\x0d\x0a')

export default crlf
