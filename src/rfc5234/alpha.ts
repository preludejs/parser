import charRange from '../char-range.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for `A-Z / a-z`.
 */
export const alpha =
  charRange('azAZ')

export default alpha
