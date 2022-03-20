import { startsWith, eat, fail, Parser, Ok } from './prelude.js'

const literal =
  <T extends string>(expected: T): Parser<T> =>
    input =>
      startsWith(input, expected) ?
        eat(input, expected.length) as Ok<T>:
        fail(input, `Expected ${expected}.`)

export default literal
