// Ordre des niveaux du CECRL, pour filtrer les contenus « jusqu'à mon niveau ».
export const LEVEL_ORDER = ['A1', 'A2', 'B1', 'B2', 'C1']
export const rank = (lv) => LEVEL_ORDER.indexOf(lv)
/** true si `lv` est au niveau visé ou en dessous. */
export const upTo = (lv, target) => rank(lv) <= rank(target || 'C1')
