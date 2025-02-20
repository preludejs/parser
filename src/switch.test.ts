import * as P from './index.js'

test('switch', () => {
  const id = P.whileNotChars(' /<>', 1)
  const comment = P.map(P.betweenLiterals('<!--', '-->'), value => ({ type: 'comment' as const, value }))
  const element = P.map(P.seq('<', id, '/>'), ([ , name ]) => ({ type: 'element' as const, name }))
  const pi = P.map(P.betweenLiterals('<?', '?>'), value => ({ type: 'pi' as const, value }))
  const decl = P.map(P.betweenLiterals('<!', '>'), value => ({ type: 'decl' as const, value }))
  const cdata = P.map(P.betweenLiterals('<![CDATA[', ']]>'), value => ({ type: 'cdata' as const, value }))
  const text = P.map(P.whileNotChars('<', 1), value => ({ type: 'text' as const, value }))
  const misc = P.switch({
    '<': element,
    '<!--': comment,
    '<?': pi,
    '<!': decl,
    '<![': cdata,
    '': text
  })
  const parser = P.parser(P.star(misc, 1))
  expect(parser('<a/>')).toEqual([
    { type: 'element', name: 'a' }
  ])
  expect(parser('foo')).toEqual([
    { type: 'text', value: 'foo' }
  ])
  expect(parser('<a/><!--comment-->foo<?xml?>')).toEqual([
    { type: 'element', name: 'a' },
    { type: 'comment', value: 'comment' },
    { type: 'text', value: 'foo' },
    { type: 'pi', value: 'xml' }
  ])
})
