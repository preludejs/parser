import textdata from './textdata.js'
import join from '../join.js'
import star from '../star.js'

const nonEscaped =
  join(star(textdata))

export default nonEscaped
