import * as P from './index.js'

export type PrattOps = {
  prefix?: Record<string, number>
  infix?: Record<string, number>
  postfix?: Record<string, number>
}

export const pratt =
  <O extends PrattOps>(bps: O, expr: P.Parser) => {
    const opParser = P.lit(
      ...Object.keys(bps.infix ?? {}),
      ...Object.keys(bps.prefix ?? {}),
      ...Object.keys(bps.postfix ?? {})
    )

    const bpof =
      (k: keyof typeof bps, op: P.Result.t<string>) =>
        !P.Result.failed(op) ?
          bps[k]?.[op.value] ?? 0 :
          0

    function inner(reader: P.Reader.t, min = 0) {

      // prefix
      const prefixOp = opParser(reader)
      const prefixBp = bpof('prefix', prefixOp)
      let lhs: P.Result.t<any>
      if (prefixBp) {
        const rhs = inner(prefixOp.reader, prefixBp)
        if (P.Result.failed(rhs)) {
          return rhs
        }
        lhs = P.Result.ok(rhs.reader, { type: 'prefix', op: prefixOp.value, rhs: rhs.value })
      } else {
        lhs = expr(prefixOp.reader)
        if (P.Result.failed(lhs)) {
          return lhs
        }
      }

      while (true) {

        // Break if the reader is at the end.
        if (P.Reader.end(lhs.reader)) {
          break
        }

        // Maybe postfix.
        const postfixOp = opParser(lhs.reader)
        const postfixBp = bpof('postfix', postfixOp)
        if (!P.Result.failed(postfixOp) && postfixBp !== 0) {
          if (postfixBp < min) {
            break
          }
          // todo [
          lhs = P.Result.ok(postfixOp.reader, { type: 'postfix', op: postfixOp.value, rhs: lhs.value })
          continue
        }

        // Infix.
        const infixOp = opParser(lhs.reader)
        if (P.Result.failed(infixOp)) {
          break
        }

        // Break if the operator has lower precedence.
        const infixBp = bpof('infix', infixOp)
        const infixBpl = infixBp > 0 ? infixBp : Math.abs(infixBp) + 1
        const infixBpr = infixBp > 0 ? infixBp + 1 : Math.abs(infixBp)
        if (infixBpl < min) {
          break
        }

        // todo elvis ?

        const rhs = inner(infixOp.reader, infixBpr)
        if (P.Result.failed(rhs)) {
          return rhs
        }
        lhs = P.Result.ok(rhs.reader, { type: 'infix', op: infixOp.value, lhs: lhs.value, rhs: rhs.value })
      }
      return lhs
    }

    return inner
  }

export default pratt
