/* eslint no-bitwise:off , no-param-reassign:off , default-case:off*/
/**
 * @author milkmidi
 * @version 1.0.1
 */

/* export var ResizeType = {
    COVER: 'cover',
    HEIGHT: 'height',
};*/

/**
 * @param  {HTMLElement} parentDOM
 * @param  {HTMLElement} element
 * @param  {number} sourceW
 * @param  {number} sourceH
 */
export function resize(parentDOM, element, sourceW, sourceH, fit = 'cover') {
  const parentW = parentDOM.offsetWidth;
  const parentH = parentDOM.offsetHeight;
  const css = {};

  switch (fit) {
    case 'cover': {
      const scaleH = parentW / sourceW;
      const scaleV = parentH / sourceH;
      const scale = scaleH > scaleV ? scaleH : scaleV;
      const width = sourceW * scale + 0.5 | 0;
      const height = sourceW * scale + 0.5 | 0;
      css.left = parentW - width >> 1;
      css.top = parentH - height >> 1;
      css.width = width;
      css.height = height;
      break;
    }
    case 'height': {
      css.height = parentH;
      const width = (sourceW / sourceH) * parentH;
      css.left = parentW - width >> 1;
      css.width = width;
      break;
    }
  }
  for (const a in css) {
    element.style[a] = `${css[a]}px`;
  }
}
