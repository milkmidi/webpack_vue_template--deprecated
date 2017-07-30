/* eslint no-param-reassign:off , forInStatement:off */
/**
 *@author milkmidi
 *@version 1.0.1
 */
let queryObject = null;
/**
 * queryString
 * @param  {string} name
 * @return {string }
 */
export function queryString(name) {
  if (queryObject != null) {
    return queryObject[name];
  }
  const { search } = location;
  if (search === '') {
    queryObject = {};
    return null;
  }
  const params = {};
  const q = search.substr(1);
  const andArr = q.split('&');
  andArr.forEach((d) => {
    const [key, value] = d.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  queryObject = params;
  return queryObject[name];
}

/**
 * @param  {HTMLElement} el
 * @param  {string} className
 */
export function hasClass(el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  }
  return !!el.className.match(new RegExp(`(\\s|^)${className}(\\s|$)`));
}
/**
 * @param  {HTMLElement} el
 * @param  {string} className
 */
export function addClass(el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += ` ${className}`;
  }
}
/**
 * @param  {HTMLElement} el
 * @param  {string} className
 */
export function removeClass(el, className) {
  if (el.classList) { el.classList.remove(className); } else if (hasClass(el, className)) {
    const reg = new RegExp(`(\\s|^)${className}(\\s|$)`);
    el.className = el.className.replace(reg, ' ');
  }
}

export function disableScrolling() {
  document.ontouchmove = e => e.preventDefault();
}
export function enableScrolling() {
  document.ontouchmove = () => true;
}

export function shuffleArray(array) {
  // eslint-disable-next-line
  for (let j, x, i = array.length; i; j = Math.floor(Math.random() * i), x = array[--i], array[i] = array[j], array[j] = x);
  return array;
}
