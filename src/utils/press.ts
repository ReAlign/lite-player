export interface I_Press_Exec_Options {
  target: HTMLElement;
  event: MouseEvent;
}

export interface I_Press_Options {
  sel: string;
  doublePressTime?: number;
  longPressTime?: number;
  onSinglePress?: (options: I_Press_Exec_Options) => void;
  onDoublePress?: (options: I_Press_Exec_Options) => void;
  onLongPressStart?: (options: I_Press_Exec_Options) => void;
  onLongPressFinish?: () => void;
}

export default class Press {
  sel: string;
  elem: HTMLElement | null;
  doublePressInterval: number;
  longPressInterval: number;
  singlePressExec: Function;
  doublePressExec: Function;
  longPressExec: Function;
  longPressCancelExec: Function;
  singleTimer: any;
  longTimer: any;
  lastPressTime: null | number;
  longPressing: boolean;
  constructor(options: I_Press_Options) {
    const {
      sel = '',
      doublePressTime = 300,
      longPressTime = 800,
      onSinglePress = () => { },
      onDoublePress = () => { },
      onLongPressStart = () => { },
      onLongPressFinish = () => { },
    } = options || {};

    this.sel = sel;

    this.doublePressInterval = doublePressTime;
    this.longPressInterval = longPressTime;

    this.singlePressExec = onSinglePress;
    this.doublePressExec = onDoublePress;
    this.longPressExec = onLongPressStart;
    this.longPressCancelExec = onLongPressFinish;

    this.singleTimer = null;
    this.longTimer = null;

    this.lastPressTime = null;
    this.longPressing = false;
  }

  add() {
    this.__addElemEventListeners();
  }
  remove() {
    this.__removeElemEventListeners();
  }

  __addElemEventListeners() {
    const {
      sel,
    } = this;
    this.elem = sel.startsWith('.') || sel.startsWith('#')
      ? document.querySelector(sel)
      : document.getElementById(sel);
    const { elem } = this;
    if (elem) {
      console.log('Call PressPro.add.');
      // touch
      elem.addEventListener('touchstart', this.__startFn.bind(this), false);
      elem.addEventListener('touchleave', this.__clearFn.bind(this), false);
      elem.addEventListener('touchend', this.__clearFn.bind(this), false);
      // elem.addEventListener('touchcancel', this.clearFn.bind(this), false);

      // click
      elem.addEventListener('mousedown', this.__startFn.bind(this), false);
      elem.addEventListener('mouseup', this.__clearFn.bind(this), false);
      // elem.addEventListener('mouseout', this.clearFn.bind(this), false);
    } else {
      throw new Error('???????????????????????????????????????????????????');
    }
  }
  __removeElemEventListeners() {
    const {
      elem,
    } = this;
    if (elem) {
      console.log('Call PressPro.remove.');
      // touch
      elem.removeEventListener('touchstart', this.__startFn.bind(this), false);
      elem.removeEventListener('touchleave', this.__clearFn.bind(this), false);
      elem.removeEventListener('touchend', this.__clearFn.bind(this), false);
      // elem.removeEventListener('touchcancel', this.clearFn.bind(this), false);

      // click
      elem.removeEventListener('mousedown', this.__startFn.bind(this), false);
      elem.removeEventListener('mouseup', this.__clearFn.bind(this), false);
      // elem.removeEventListener('mouseout', this.clearFn.bind(this), false);
    } else {
      console.error('?????????????????????????????????????????????????????????');
    }
  }
  __startFn(e) {
    const self = this;

    e.stopPropagation();
    e.preventDefault();
    this.__preventSelection();

    this.longTimer = setTimeout(() => {
      self.longPressing = true;
      self.longPressExec && self.longPressExec({
        target: self.elem,
        event: e,
      });
      self.__allowSelection();
    }, this.longPressInterval);
  }
  __clearFn(e) {
    const self = this;

    e.stopPropagation();
    e.preventDefault();

    /**
     * ??????
     * ??? lastPressTime
     *  ???
     *    1. ???????????????
     *    2. ??????????????????????????????
     *    3. ??????????????????
     *  ???
     *    1. ????????????
     *    2. ???????????????????????????
     */
    if (self.lastPressTime) {
      if (Date.now() - self.lastPressTime < self.doublePressInterval) {
        self.lastPressTime = null;
        clearTimeout(self.singleTimer);

        self.doublePressExec && self.doublePressExec();
      }
    } else {
      self.lastPressTime = Date.now();
      self.singleTimer = setTimeout(() => {
        self.lastPressTime = null;
        if (self.longPressing === false) {
          self.singlePressExec && self.singlePressExec();
        }
      }, this.doublePressInterval);
    }

    /**
     * ????????????
     *  1. ?????????????????????
     *  2. ?????????????????????
     *    2.1 ???
     *      2.1.1 ?????????????????????
     *      2.1.2 ????????????????????????
     *      2.1.3 ?????????????????????
     *      2.1.4 ????????????????????????
     */
    clearTimeout(this.longTimer);
    if (this.longPressing) {
      self.longPressing = false;

      self.lastPressTime = null;
      clearTimeout(self.singleTimer);

      this.longPressCancelExec && this.longPressCancelExec();
      this.__allowSelection();
    }
  }
  __preventSelection() {
    const {
      style,
    } = this.elem || {};
    if (style) {
      style.userSelect = 'none';
    }
  }
  __allowSelection() {
    const {
      style,
    } = this.elem || {};
    if (style) {
      style.userSelect = 'auto';
    }
  }
}
