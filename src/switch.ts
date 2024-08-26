import * as RadixTrie from '@prelude/radix-trie'
import * as Reader from './reader.js'
import * as Result from './result.js'
import type * as Parser from './parser.js'

const switch_ =
  <T extends Record<string, Parser.t>>({ '': defaultCase, ...cases }: T): Parser.t<Parser.Parsed<T[keyof T]>> => {
    const trie = RadixTrie.of(Object.keys(cases))
    return (reader: Reader.t) => {
      const key = RadixTrie.longestPrefix(trie, reader.input, reader.offset)
      if (key == null) {
        if (defaultCase == null) {
          return Result.fail(reader, 'Expected one of cases.')
        } else {
          return defaultCase(reader) as Result.t<Parser.Parsed<T[keyof T]>>
        }
      }
      const parser = cases[key]
      if (parser == null) {
        return Result.fail(reader, `Expected parser for ${key} case.`)
      }
      return parser(reader) as Result.t<Parser.Parsed<T[keyof T]>>
    }
  }

export { switch_ as switch }

export default switch_
