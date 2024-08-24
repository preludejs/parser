import * as RadixTrie from '@prelude/radix-trie'
import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

const switch_ =
  (cases: Record<string, Parser.t>) => {
    const trie = RadixTrie.of(Object.keys(cases))
    return (reader: Reader.t) => {
      const prefix = RadixTrie.longestPrefix(trie, reader.input, reader.offset)
      const parser = prefix != null ? cases[prefix] : null
      if (parser != null) {
        return parser(reader)
      }
      return Result.fail(reader, `Expected one of ${Object.keys(cases).length} cases.`)
    }
  }

export { switch_ as switch }

export default switch_
