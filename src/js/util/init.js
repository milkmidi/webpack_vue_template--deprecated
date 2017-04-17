/* eslint no-bitwise:off,no-console:off */
/*
var result = []
"debug=medialand".split( '' ).forEach( function ( e ) {
    result.push( e.charCodeAt( 0 ) * 2);
});
result = result.reverse();
console.log(result)
*/
/**
 * @author milkmidi
 * @version 1.0.1
 */
function reduce(p, c) {
    return p + String.fromCharCode(c >> 1);
}
function emptyFun() { }
const fakeConsole = { log: emptyFun, warn: emptyFun, error: emptyFun, assert: emptyFun };
const threeX3 = [200, 220, 194, 216, 194, 210, 200, 202, 218, 122, 206, 234, 196, 202, 200].reverse().reduce(reduce, '');
if (typeof window.console === 'undefined' || typeof window.console.log === 'undefined') {
    window.console = fakeConsole;
}
window.debug = new RegExp(threeX3).test(location.href);
console.log(`debug:${window.debug}`);
// window.debug = /debug=medialand/.test( location.href );

if (window.debug) {
    const helloWord = decodeURIComponent('%E2%87%91%E2%87%91%E2%87%93%E2%87%93%E2%87%90%E2%87%92%E2%87%90%E2%87%92%E2%92%B7%E2%92%B6');
    console.log(`%cDebugMode! ${helloWord}`, 'background: #222; color: #bada55; font-size:20px;');
} else if (process.env.NODE_ENV === 'production') {
    window.console = fakeConsole;
}
