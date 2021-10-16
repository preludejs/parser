import type { Input } from './input.js'
import type P from './parser.js'
import type R from './parser-result.js'

const sequence =
  <T extends P<unknown>[]>(...as: T): P<{ [K in keyof T]: R<T[K]> }> =>
    input => {
      const rs: unknown[] = []
      let input_ = input
      for (const a of as) {
        const r = a(input_)
        input_ = r[0]
        rs.push(r[1])
      }
      return [ input_, rs ] as [ Input, { [K in keyof T]: R<T[K]> } ]
    }

export default sequence
