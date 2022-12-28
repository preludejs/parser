import type * as Parser from './parser.js'
import * as Result from './result.js'
import * as RadixTrie from '@prelude/radix-trie'

/** Succeeds on longest matching literal. */
export default function longestLiteral<T extends string>(...literals: T[]): Parser.t<T> {
  const n = literals.length
  const trie = RadixTrie.of(literals)
  return function (input) {
    const length = RadixTrie.longestPrefixLength(trie, input.input, input.offset)
    return length > 0 ?
      Result.eat(input, length) as Result.Ok<T> :
      Result.fail(input, `Expected one of ${n} literals.`)
  }
}
