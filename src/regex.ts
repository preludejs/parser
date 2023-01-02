import * as Result from './result.js'
import type * as Parser from './parser.js'

type Indices = [number, number][] & { groups?: Record<string, [number, number]> }

export function regex(
  re: RegExp,
  valueGroup: number | string = 0,
  advanceGroup: number | string = 0,
): Parser.t<string> {
  if (!re.sticky) {
    throw new Error('expected regex with sticky flag (y).')
  }
  if (!re.flags.includes('d')) {
    throw new Error('expected regex with has-indices flag (d).')
  }
  if (re.global) {
    throw new Error('expected regex without global flag (g).')
  }
  return function (reader) {
    re.lastIndex = reader.offset
    const match = re.exec(reader.input)
    if (!match) {
      return Result.fail(reader, 'regex did not match')
    }
    const valueString =
      typeof valueGroup === 'string' && match.groups ?
        match.groups[valueGroup] :
        match[valueGroup]
    if (typeof valueString !== 'string') {
      throw new Error('invalid value group')
    }
    const indices = match['indices'] as undefined | Indices
    if (!indices) {
      throw new Error('undefined indices')
    }
    const advanceIndices =
      typeof advanceGroup === 'string' ?
        indices.groups?.[advanceGroup] :
        indices[advanceGroup]
    if (!advanceIndices) {
      throw new Error('invalid advance indices')
    }
    return Result.ok(reader, valueString, advanceIndices[1] - reader.offset)
  }
}

export { regex as re }

export default regex
