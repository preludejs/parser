import re from '../regexp.js'
import map from '../map.js'

export const escaped =
  map(re(/^"((?:[^"]|"")*)"/, 1), _ => _.replaceAll('""', '"'))

export default escaped
