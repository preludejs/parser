import type P from './parser'

type ParserResult<T> = T extends P<infer R> ? R : never

export default ParserResult
