import * as RadixTrie from '@prelude/radix-trie'
import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

export const lit =
  <T extends string>(...literals: T[]): Parser.t<T> => {
    if (literals.length === 1) {
      return reader =>
        Reader.startsWith(reader, literals[0]) ?
          Result.eat(reader, literals[0].length) as Result.Ok<T> :
          Result.fail(reader, `Expected ${literals[0]}.`)
    }
    const trie = RadixTrie.of(literals)
    return reader => {
      const length = RadixTrie.longestPrefixLength(trie, reader.input, reader.offset)
      return length > 0 ?
        Result.eat(reader, length) as Result.Ok<T> :
        Result.fail(reader, `Expected one of ${literals.length} literals.`)
    }
  }

export {
  lit as literal
}

export default lit
