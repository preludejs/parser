import * as P from './llama.js'

// text template literal that removed first line and removes indent based on number of spaces of first line
function text([ text ]: TemplateStringsArray, ...values: unknown[]) {
  if (values.length > 0) {
    throw new Error('values not supported')
  }
  const lines = text.split('\n').slice(1, -1)
  const indent = /^\s*/.exec(lines[0])?.[0] ?? ''
  return lines.map(line => line.replace(indent, '')).join('\n') + '\n'
}

test('line comment(s)', () => {
  expect(P.parse(P.c_line_comment, ' // comment\n')).toEqual(' comment')
  expect(P.parse(P.c_line_comments, '// one\n// two\n')).toEqual(' one\n two')
  expect(P.parse(P.c_line_comments, text`
    // first leading
    // second leading
  `)).toEqual(' first leading\n second leading')
})

test('enum item', () => {
  expect(P.parse(P.c_enum_item, text`
    // first leading
    // second leading
    FOO, // trailing
  `)).toEqual({
    type: 'enum_item',
    name: 'FOO',
    value: null,
    comment: ' first leading\n second leading\n trailing'
  })
})

test('enum definition', () => {
  expect(P.parse(P.left(P.c_enum_def, P.ws0), text`
    enum llama_gretype {
      LLAMA_GRETYPE_END            = 0,
      LLAMA_GRETYPE_ALT            = 1,
      // foo
      LLAMA_GRETYPE_RULE_REF       = 2,
      LLAMA_GRETYPE_CHAR           = 3,
      LLAMA_GRETYPE_CHAR_NOT       = 4, // bar
      LLAMA_GRETYPE_CHAR_RNG_UPPER = 5,

      // modifies a preceding LLAMA_GRETYPE_CHAR or
      // LLAMA_GRETYPE_CHAR_RNG_UPPER to add an alternate char to match ([ab], [a-zA])
      LLAMA_GRETYPE_CHAR_ALT       = 6,
    };
  `)).toEqual({
    type: 'enum_def',
    name: 'llama_gretype',
    list: [
      { type: 'enum_item', name: 'LLAMA_GRETYPE_END', value: '0', comment: null },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_ALT', value: '1', comment: null },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_RULE_REF', value: '2', comment: ' foo' },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_CHAR', value: '3', comment: null },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_CHAR_NOT', value: '4', comment: ' bar' },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_CHAR_RNG_UPPER', value: '5', comment: null },
      { type: 'enum_item', name: 'LLAMA_GRETYPE_CHAR_ALT', value: '6', comment: ' modifies a preceding LLAMA_GRETYPE_CHAR or\n LLAMA_GRETYPE_CHAR_RNG_UPPER to add an alternate char to match ([ab], [a-zA])' }
    ]
  })
})
