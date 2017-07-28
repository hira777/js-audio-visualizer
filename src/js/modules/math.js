/**
 * ある範囲から別の範囲に数値を再マップする
 * @param  {Number} value  変換される値
 * @param  {Number} start1 現在の値の範囲の下限
 * @param  {Number} stop1  現在の値の範囲の上限
 * @param  {Number} start2 再マップしたい値の範囲の下限
 * @param  {Number} stop2  再マップしたい値の範囲の上限
 * @return {Number}        再マップされた数値
 * @example
 *   map(50, 0, 100, 0, 200)
 *   returns 100
 */
export function map(value, start1, stop1, start2, stop2) {
  return ((value - start1) / (stop1 - start1)) * (stop2 - start2) + start2;
}
