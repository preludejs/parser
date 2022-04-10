import { startsWith, eat, fail, Parser, Ok } from './prelude.js'

/** Succeeds on longest matching literal. */
const longestLiteral =
  <T extends string>(...literals: T[]): Parser<T> => {

    // TODO: If ... makes a copy, no need to slice.
    const sortedLiterals = literals
      .slice()
      .sort((a, b) => b.length - a.length)
    return input => {
      for (const literal of sortedLiterals) {
        if (startsWith(input, literal)) {
          return eat(input, literal.length) as Ok<T>
        }
      }
      return fail(input, `Expected one of literals ${literals.join(', ')}.`)
    }
  }

export default longestLiteral
