import utf8 from '../utf8.js'
import charRange from '../char-range.js'
import either from '../either.js'

/**
 * @see https://datatracker.ietf.org/doc/html/rfc5234#appendix-B.1
 * @returns parser for controls.
 */
const ctl =
  either(charRange('\x00\x1f'), utf8('\x7f'))

export default ctl
