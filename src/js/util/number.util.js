/**
 * 是否為number型別
 * @param {any} value
 * @return {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number' && isNaN(value);
}
