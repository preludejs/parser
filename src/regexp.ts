import * as Result from './result.js'
import type * as Parser from './parser.js'

type Indices = [number, number][] & { groups?: Record<string, [number, number]> }

/**
 * @param regexp regular expression to match.
 * @param valueGroup group to use as parsing result (default 0).
 * @param advanceGroup group to use to advance parser on successful match (default 0).
 * @returns parser consuming input matching provided regular expression.
 */
export function regexp(
  regexp: RegExp,
  valueGroup: number | string = 0,
  advanceGroup: number | string = 0
): Parser.t<string> {
  const re = new RegExp(regexp.source, 'dy' + regexp.flags.replace(/[dyg]/g, ''))
  return function (reader) {
    re.lastIndex = reader.offset
    const match = re.exec(reader.input)
    if (!match) {
      return Result.fail(reader, `regexp ${re} did not match`)
    }
    const valueString =
      typeof valueGroup === 'string' ?
        match.groups?.[valueGroup] :
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
    return Result.ok(reader, advanceIndices[1] - reader.offset, valueString)
  }
}

export { regexp as re }

export default regexp
