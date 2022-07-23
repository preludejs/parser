
import { startsWith, eat, fail, Parser, Ok } from './prelude.js'

/** Succeeds on first matched literal. */
const firstLiteral =
  <T extends string>(...literals: T[]): Parser<T> =>
    input => {
      for (const literal of literals) {
        if (startsWith(input, literal)) {
          return eat(input, literal.length) as Ok<T>
        }
      }
      return fail(input, `Expected one of literals ${literals.join(', ')}.`)
    }

export default firstLiteral
