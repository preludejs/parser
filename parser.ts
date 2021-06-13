import type { Input } from './input.js'
import type Result from './result.js'

type Parser<R> = (value: Input) => Result<R>

export default Parser
