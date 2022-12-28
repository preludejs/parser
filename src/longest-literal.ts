import type * as Parser from './parser.js'
import * as Result from './result.js'
import * as RadixTrie from '@prelude/radix-trie'

/** Succeeds on longest matching literal. */
export function longestLiteral<T extends string>(...literals: T[]): Parser.t<T> {
  const n = literals.length
  const trie = RadixTrie.of(literals)
  return function (reader) {
    const length = RadixTrie.longestPrefixLength(trie, reader.input, reader.offset)
    return length > 0 ?
      Result.eat(reader, length) as Result.Ok<T> :
      Result.fail(reader, `Expected one of ${n} literals.`)
  }
}
