import { eat, fail, Parser, Ok } from './prelude.js'
import * as RadixTrie from '@prelude/radix-trie'

/** Succeeds on first matched literal. */
const firstLiteral =
  <T extends string>(...literals: T[]): Parser<T> => {
    const n = literals.length
    const trie = RadixTrie.of(literals)
    return input => {
      const length = RadixTrie.firstPrefixLength(trie, input[0], input[1])
      return length > 0 ?
        eat(input, length) as Ok<T> :
        fail(input, `Expected one of ${n} literals.`)
    }
  }

export default firstLiteral
