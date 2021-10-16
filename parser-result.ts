import type P from './parser.js'

type ParserResult<T> = T extends P<infer R> ? R : never

export default ParserResult
