import * as P from './index.js'

const pp =
  (node: any): string => {
    switch (node?.type) {
      case 'prefix':
        return `(${node.op} ${pp(node.rhs)})`
      case 'infix':
        return `(${node.op} ${pp(node.lhs)} ${pp(node.rhs)})`
      case 'postfix':
        return `(${node.op} ${pp(node.lhs)})`
      default:
        if (typeof node === 'string') {
          return `${node}`
        }
        throw new Error(`Unexpected node: ${node}`)
    }
  }

test('https://matklad.github.io/2020/04/13/simple-but-powerful-pratt-parsing.html', () => {
  const p = P.parser(P.pratt({
    prefix: {
      '-': 9,
      '+': 9
    },
    infix: {
      '=': -2,
      '?': -4,
      '+': +6,
      '-': +6,
      '*': +8,
      '/': +8,
      '.': -14
    },
    postfix: {
      '!': 11,
      '[': 11
    }
  }, P.re(/\w+/i)))
  const t = (s: string) => pp(p(s))
  expect(t('1')).toEqual('1')
  expect(t('1+2*3')).toEqual('(+ 1 (* 2 3))')
  expect(t('1*2+3')).toEqual('(+ (* 1 2) 3)')
  expect(t('a+b*c*d+e')).toEqual('(+ (+ a (* (* b c) d)) e)')
  expect(t('f.g.h')).toEqual('(. f (. g h))')
  expect(t('1+2+f.g.h*3*4')).toEqual('(+ (+ 1 2) (* (* (. f (. g h)) 3) 4))')
  expect(t('--1*2')).toEqual('(* (- (- 1)) 2)')
  expect(t('--f.g')).toEqual('(- (- (. f g)))')
  // expect(t('-9!')).toEqual('(- (! 9))')
  // expect(t('f.g!')).toEqual('(! (. f g))')
  // expect('(((0)))').toEqual('0')
  // expect('x[0][1]').toEqual('([ ([ x 0) 1)')
  // expect('a?b:c?d:e').toEqual('(? a b (? c d e))')
  // expect(t('a = 0 ? b : c = d')).toEqual('(= a (= (? 0 b c) d))')
})
