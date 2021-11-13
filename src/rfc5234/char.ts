import charRange from '../char-range.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for any 7-bit US-ASCII character, excluding NUL.
 */
const char =
  charRange('\x01\x7f')

export default char
