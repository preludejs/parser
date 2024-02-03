import map from '../map.js'

const true_ =
  map('true', () => true as const)

export { true_ as true }

export default true_
