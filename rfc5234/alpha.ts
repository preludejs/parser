import charRanges from '../char-ranges.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for `A-Z / a-z`.
 */
const alpha =
  charRanges([ 'A', 'Z' ], [ 'a', 'z' ])

export default alpha
