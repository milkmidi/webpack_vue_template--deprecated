let viewportDOM;
export function setViewport(value) {
  if (!viewportDOM) { viewportDOM = document.getElementsByName('viewport')[0]; }
  viewportDOM.setAttribute('content', value);
}
export function setViewportToDeviceWidth() {
  setViewport('width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no');
}
export function setViewportSize(size) {
  const scale = screen.width / size;
  /* if (device.ios() && device.landscape()) {
      scale = screen.height / size;
  } */
  const value = `width=${size},initial-scale=${scale},minimum-scale=${scale}, maximum-scale=${scale},user-scalable=no, shrink-to-fit=no`;
  setViewport(value);
}
