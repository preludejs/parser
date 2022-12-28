import chars from '../chars.js'
import charRange from '../char-range.js'
import either from '../either.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for controls.
 */
export const ctl =
  either(charRange('\x00\x1f'), chars('\x7f'))

export default ctl
