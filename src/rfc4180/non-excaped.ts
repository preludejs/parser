import textdata from './textdata.js'
import join from '../join.js'
import star from '../star.js'

export const nonEscaped =
  join(star(textdata))

export default nonEscaped
