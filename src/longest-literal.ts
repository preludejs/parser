import { eat, fail, Parser, Ok } from './prelude.js'
import * as RadixTrie from '@prelude/radix-trie'

/** Succeeds on longest matching literal. */
const longestLiteral =
  <T extends string>(...literals: T[]): Parser<T> => {
    const n = literals.length
    const trie = RadixTrie.of(literals)
    return input => {
      const length = RadixTrie.longestPrefixLength(trie, input.input, input.offset)
      return length > 0 ?
        eat(input, length) as Ok<T>:
        fail(input, `Expected one of ${n} literals.`)
    }
  }

export default longestLiteral
