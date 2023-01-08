class EventBus {
  map: any;
  constructor() {
    this.map = new Map();
  }
  on(key = '', fn) {
    const fns = this.map.get(key) || [];
    fns.push(fn);
    this.map.set(key, fns);
  }
  emit(key, ...args) {
    const fns = this.map.get(key) || [];
    fns.forEach(fn => {
      fn(...args);
    });
  }
  // 增强
  off(key, fn) {
    let fns = this.map.get(key) || [];
    fns = fns.filter(f => f !== fn);
    fns.length
      ? this.map.set(key, fns)
      : this.map.delete(key);
  }
  once(key, fn) {
    // off it after call
    const temp = (...args) => {
      fn(...args);
      this.off(key, temp);
    };
    this.on(key, temp);
  }
}

export const FN_C_TOGGLE_PLAY = 'eb_c_toggle-paly';
export const FN_C_HANDLE_VOICE_OFF = 'eb_c_handle_voice_off';
export const FN_C_HANDLE_VOICE_PLUS_TEN_PERCENT = 'eb_c_handle_voice_plus_ten_percent';
export const FN_C_HANDLE_VOICE_MINUS_TEN_PERCENT = 'eb_c_handle_voice_minus_ten_percent';

export const FN_C_TOGGLE_PIC_IN_PIC = 'db_c_toggle-pic_in_pic';
export const FN_C_TOGGLE_FULLSCREEN = 'eb_c_toggle-fullscreen';

export const FN_V_CAN_PLAY = 'eb_v_can-play';
export const FN_V_TIMEUPDATE = 'eb_v_timeupdate';
export const FN_V_SLIDE_UPDATE = 'eb_v_slide-update';

export default new EventBus();
