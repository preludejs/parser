import comma from './comma.js'
import cr from './cr.js'
import dquote from './dquote.js'
import dquote2 from './dquote2.js'
import join from '../join.js'
import lf from './lf.js'
import map from '../map.js'
import sorrounded1 from '../sorrounded1.js'
import star from '../star.js'
import textdata from './textdata.js'
import first from '../first.js'

export const escaped =
  sorrounded1(dquote, join(star(first(textdata, comma, cr, lf, map(dquote2, () => '"')))))

export default escaped
