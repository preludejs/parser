import lit from '../lit.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for Internet standard newline.
 */
export const crlf =
  lit('\x0d\x0a')

export default crlf
