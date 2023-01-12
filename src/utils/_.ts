export const $ = (sel: string): HTMLElement | null => {
  return sel.startsWith('.') || sel.startsWith('#')
    ? document.querySelector(sel)
    : document.getElementById(sel);
};

export const handleKeyControl = (e: any, handles: any): false | null => {
  if (e?.target === document.body) {
    const { onUp, onDown, onLeft, onRight, onSpace } = handles;
    const NOOP = () => { };
    const UP = 38;
    const DOWN = 40;
    const LEFT = 37;
    const RIGHT = 39;
    const SPACE = 32;

    const EVENTS: any = {
      [UP]: onUp,
      [DOWN]: onDown,
      [LEFT]: onLeft,
      [RIGHT]: onRight,
      [SPACE]: onSpace,
    };

    if (e) {
      (EVENTS[e.keyCode] || NOOP)(e);
    }
    return false;
  }
  return null;
};

export const getPlatform = () => {
  const obj = {
    isMobile: false,
    isDesktop: false,
  };
  const UA = navigator.userAgent;
  // eslint-disable-next-line max-len
  const R = /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i;
  if ((UA.match(R))) {
    obj.isMobile = true;
  } else {
    obj.isDesktop = true;
  }

  return obj;
};

export const getEnterFullScreenFn = (elem: any): Function | false => {
  let fn: Function | false = false;
  if (elem.requestFullscreen) {
    fn = elem.requestFullscreen;
  } else if (elem.mozRequestFullScreen) {
    fn = elem.mozRequestFullScreen;
  } else if (elem.webkitRequestFullscreen) {
    fn = elem.webkitRequestFullscreen;
  } else if (elem.msRequestFullscreen) {
    fn = elem.msRequestFullscreen;
  } else {
    //
  }
  return fn;
};

export const getExitFullScreenFn = (): Function | false => {
  const elem: any = document;
  let fn: Function | false = false;
  if (elem.exitFullscreen) {
    fn = elem.exitFullscreen;
  } else if (elem.mozExitFullScreen) {
    fn = elem.mozExitFullScreen;
  } else if (elem.webkitExitFullscreen) {
    fn = elem.webkitExitFullscreen;
  } else if (elem.msExitFullscreen) {
    fn = elem.msExitFullscreen;
  } else {
    //
  }

  return fn;
};

/**
 * 文本复制
 *
 * @param {string} [text=''] 复制文本
 *
 * @return {Promise}
 */
export const copy = (text = ''): Promise<void> => {
  return new Promise<void>((res, rej) => {
    const textNode = document.createElement('textarea');
    textNode.value = text;
    textNode.style.position = 'absolute';
    textNode.style.top = '0';
    textNode.style.zIndex = '-999';
    document.body.appendChild(textNode);

    textNode.select();

    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textNode);

      if (successful) {
        res();
      } else {
        rej();
      }
    } catch (err) {
      document.body.removeChild(textNode);
      rej();
    }
  });
};

export default {};
