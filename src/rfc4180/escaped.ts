import comma from './comma.js'
import cr from './cr.js'
import dquote from './dquote.js'
import dquote2 from './dquote2.js'
import join from '../join.js'
import lf from './lf.js'
import map from '../map.js'
import between1 from '../between1.js'
import star from '../star.js'
import textdata from './textdata.js'
import first from '../first.js'

export const escaped =
  between1(dquote, join(star(first(textdata, comma, cr, lf, map(dquote2, () => '"')))))

export default escaped
