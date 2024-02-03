import map from '../map.js'

const false_ =
  map('false', () => false as const)

export { false_ as false }

export default false_
