import chars from '../chars.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for `0 / 1`.
 */
export const bit =
  chars('01')

export default bit
