#! /usr/bin/env -S node --no-warnings --loader ts-node/esm

import * as P from '../index.js'
// import * as Path from 'node:path'

export * from '../index.js'

export const l =
  <A extends P.Liftable>(parser: A): P.t<P.Parsed<A>> =>
    P.right(P.ws0, parser)

export const c_lit_number =
  P.regexp(/-?\d+/)

export const c_lit_string =
  P.regexp(/"[^"]*"/)

export const c_lit_char =
  P.regexp(/'.'/)

export const c_lit =
  P.or(
    c_lit_number,
    c_lit_string,
    c_lit_char
  )

export const c_line_comment =
  P.map(l(P.fromUntil('//', '\n')), _ => _.inner)

export const c_line_comments =
  P.map(P.star(c_line_comment), _ => _.join('\n'))

export const c_multiline_comment =
  P.map(P.fromUntil('/*', '*/'), _ => _.inner)

export const c_comment =
  P.right(/[ \t]*/, P.either(c_line_comments, c_multiline_comment))

export const c_identifier =
  P.regexp(/[a-z_]\w*/i)

export const c_block =
  <T>(parser: P.Parser<T>) =>
    P.between(l('{'), l('}'), parser)

export const c_enum_item_iota =
  P.map(c_identifier, name => ({
    type: 'enum_item' as const,
    name,
    value: null
  }))

export const c_enum_item_explicit =
  P.map(P.seq(c_identifier, P.ws0, '=', P.ws0, c_lit), _ => ({
    type: 'enum_item' as const,
    name: _[0],
    value: _[4]
  }))

export const c_enum_item: P.t<{ type: 'enum_item', name: string, value: null | string, comment: null | string }> =
  P.map(l(P.seq(
    P.maybe(c_comment),
    P.either(
      c_enum_item_explicit,
      c_enum_item_iota
    ),
    /[ \t]*/,
    P.maybe(','),
    P.maybe(c_comment)
  )), _ => ({ ..._[1], comment: (_[0] || '') + (_[4] ? `\n${_[4]}` : '') || null }))

export const c_enum_list =
  P.star(c_enum_item)

export const c_enum_type =
  P.map(P.seq('enum', P.ws1, c_identifier), _ => ({
    type: 'enum_type' as const,
    name: _[2]
  }))

export const c_enum_def =
  P.map(P.seq(c_enum_type, P.ws0, c_block(c_enum_list), ';'), _ => ({
    type: 'enum_def' as const,
    name: _[0].name,
    list: _[2],
  }))

export type c_nodes = {
  enum_type: typeof c_enum_type,
  enum_item: typeof c_enum_item,
  enum_def: typeof c_enum_def
}

export type c_node_key =
  keyof c_nodes

export type c_node<K extends c_node_key = c_node_key> =
  P.Parsed<c_nodes[K]>

// console.log(P.parse(c_identifier, 'foo'))
// console.log(P.parse(c_enum_type, 'enum llama_token_type'))
// console.log(P.parse(c_enum_item, ' FOO'))
// console.log(P.parse(c_enum_item, ' FOO = 1'))
// console.log(P.parse(c_enum_list, 'FOO, BAR = 1, BAZ'))
// console.log(P.parse(c_enum_def, 'enum llama_token_type { FOO };'))
// console.log(P.parse(c_enum_def, 'enum llama_token_type { FOO, BAR };'))
// console.log(P.parse(c_enum_def, `enum llama_token_type {
//   LLAMA_TOKEN_TYPE_UNDEFINED    = 0,
//   LLAMA_TOKEN_TYPE_NORMAL       = 1,
//   LLAMA_TOKEN_TYPE_UNKNOWN      = 2,
//   LLAMA_TOKEN_TYPE_CONTROL      = 3,
//   LLAMA_TOKEN_TYPE_USER_DEFINED = 4,
//   LLAMA_TOKEN_TYPE_UNUSED       = 5,
//   LLAMA_TOKEN_TYPE_BYTE         = 6,
// };`))
// console.log(P.parse(c_enum_list, 'FOO = 1, // foo\nBAR = 2'))

// import * as Fs from 'node:fs'
// import * as Path from 'node:path'
// const __dirname = new URL('.', import.meta.url).pathname
// const input = Fs.readFileSync(Path.join(__dirname, 'llama.h'), 'utf-8')

const input = `
enum llama_gretype {
  LLAMA_GRETYPE_END            = 0,
  LLAMA_GRETYPE_ALT            = 1,
  // bar
  LLAMA_GRETYPE_RULE_REF       = 2,
  LLAMA_GRETYPE_CHAR           = 3,
  LLAMA_GRETYPE_CHAR_NOT       = 4,
  LLAMA_GRETYPE_CHAR_RNG_UPPER = 5,

  // modifies a preceding LLAMA_GRETYPE_CHAR or
  // LLAMA_GRETYPE_CHAR_RNG_UPPER to add an alternate char to match ([ab], [a-zA])
  LLAMA_GRETYPE_CHAR_ALT       = 6,
};
`

export type c_emitter = {
  [k in c_node_key]: (param: c_node<k>) => string
}

const dts_printer: c_emitter = {
  enum_item: item => {
    const line = item.value === null ?
      `  ${item.name},` :
      `  ${item.name} = ${item.value},`
    return item.comment ?
      `  /** ${item.comment} */\n${line}` :
      line
  },
  enum_type: type => {
    return `not implemented ${type}`
  },
  enum_def: def =>
    `export enum ${def.name} {
${def.list.map(dts_printer.enum_item).join('\n')}
}`,
}

// console.log(P.next(c_enum_def)(P.Reader.of(llama_h))) // .map(dts_printer.enum_def as any).join('\n\n'))
console.log(P.parse(P.all(c_enum_def), input).map(dts_printer.enum_def as any).join('\n\n'))
