import { peek, ok, fail, Parser } from './prelude.js'

/**
 * @returns parser matching provided character `ranges`.
 * @example
 *   charRange('09azAZ') // equivalent to /[0-9a-zA-Z]/ regexp.
 */
const charRange =
  (ranges: string): Parser<string> =>
    input => {
      const c = peek(input)
      if (!c) {
        return fail(input, 'End of input.')
      }
      for (let i = 0; i < ranges.length; i += 2) {
        if (ranges[i] <= c && c <= ranges[i + 1]) {
          return ok(input, c, 1)
        }
      }
      return fail(input, `Not in char range ${ranges}.`)
    }

export default charRange
