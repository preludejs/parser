import { startsWith, eat, fail, Parser } from './prelude.js'

const literal =
  (expected: string): Parser<string> =>
    input =>
      startsWith(input, expected) ?
        eat(input, expected.length) :
        fail(input, `Expected ${expected}.`)

export default literal
