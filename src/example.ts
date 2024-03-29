
import * as P from './index.js'

const pp =
  (...args: unknown[]) =>
    console.log(...args.map(_ => JSON.stringify(_, null, 2)))

// const p = P.lift('END')
const p = P.until('END')
pp(p(P.Reader.of('END')))

console.log('---')
