/**
 *@author milkmidi
 *@version 1.0.1
 */
const documentElement = window.document.documentElement;
const userAgent = window.navigator.userAgent.toLowerCase();
const standalone = window.navigator.standalone;
const safari = /safari/.test(userAgent);
const fbWebView = /fbid|fbios|fblc|fb_iab|fb4a|fbav/.test(userAgent);
const lineWebView = /line/i.test(userAgent);
const ios = /iphone|ipod|ipad/.test(userAgent);
let uiwebview = false;
function hasClass(className) {
    const regex = new RegExp(className, 'i');
    return documentElement.className.match(regex);
}
function addClass(className) {
    let currentClassNames = null;
    if (!hasClass(className)) {
        currentClassNames = documentElement.className.replace(/^\s+|\s+$/g, '');
        documentElement.className = `${currentClassNames} ${className}`;
    }
}

if (ios) {
    if (!standalone && safari) {
        // iosType = 'ios browser';
    } else if (standalone && !safari) {
        // iosType = 'ios standalone';
    } else if (!standalone && !safari) {
        // iosType = 'ios uiwebview';
        uiwebview = true;
        addClass('uiwebview');
    }
}
if (fbWebView) addClass('fbwebview');
if (lineWebView) addClass('linewebview');


/**
 * 是否在WebView下
 * @return {boolean}
 */
export function isWebView() {
    return uiwebview || fbWebView || lineWebView;
}
/**
 * 是否在FBWebView
 * @return {boolean}
 */
export function isFBWebView() {
    return fbWebView;
}
/**
 * 是否在LineWebView
 * @return {boolean}
 */
export function isLineWebView() {
    return lineWebView;
}
