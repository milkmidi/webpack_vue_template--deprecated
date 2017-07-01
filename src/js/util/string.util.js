export function format(src, ...args) {
  if (arguments.length === 0) return null;
    // var args = Array.prototype.slice.call( arguments, 1 );
  return src.replace(/\{(\d+)\}/g, (m, i) => args[i]);
}
export function trim(s) {
  return s.replace(/^\s*|\s*$/gi, '');
}
