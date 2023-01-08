import throttle from 'lodash.throttle';
// import { getParamsItem } from '@/utils/params';
// import { getItemLSDetail, updateItemLSDetail } from '@/pages/ItemDetail/helper';
// import getControlEvents from './control-events';
import Press from '@/utils/press';
import { injectStyleTag } from '@/utils/dom';
import { getPXNumber } from '@/utils/string';
import EB, { FN_C_TOGGLE_PLAY, FN_V_CAN_PLAY, FN_V_TIMEUPDATE, FN_V_SLIDE_UPDATE } from '@/utils/event-bus';

import { handleKeyControl } from './_';
import { ID_PREFIX, CLASS_PREFIX, VIDEO_DOM_MISSING } from './../config';

const videoPlaying = (vDom: HTMLVideoElement | null) => {
  return vDom ? !vDom.paused : null;
};
const getDirection = (opts) => {
  const {
    target,
    event,
  } = opts;
  const getX = (e) => {
    return e.type === 'mousedown' ? e.offsetX : e.touches[0].clientX;
  };
  const ss = getComputedStyle(target, null);

  const w = getPXNumber(ss.width);
  const x = getX(event);

  return x - w / 2 > 0 ? 'right' : 'left';
};

const Store: {
  longPressPro: Press | null;
  canPlayFn: (() => void) | null;
  timeupdateFn: (() => void) | null;
  cacheOptions: I_InitPlayer_Created_Props | null;
  controlEvents: I_ControlEvents;
  getCacheOptions: () => Promise<any>;
} = {
  longPressPro: null,
  canPlayFn: null,
  timeupdateFn: null,
  cacheOptions: null,
  controlEvents: {},
  getCacheOptions() {
    return new Promise((rs) => {
      if (Store.cacheOptions) {
        const { videoDom } = Store.cacheOptions;
        if (videoDom) {
          rs(Store.cacheOptions);
        } else {
          throw new Error(VIDEO_DOM_MISSING);
        }
      }
    });
  },
};

const registerPressPlayStateEvt = async () => {
  const injectSpeedPlayDom = (pDom: HTMLDivElement | null): HTMLDivElement | null => {
    const idClsSuffix = 'speed-play';
    const id = `${ID_PREFIX}${idClsSuffix}`;
    const className = `${CLASS_PREFIX}${idClsSuffix}`;
    const cDom: HTMLDivElement | null = document.querySelector(`#${id}`);
    if (!cDom) {
      const speedPlayDom = document.createElement('div');
      speedPlayDom.id = id;
      speedPlayDom.className = className;
      injectStyleTag(`
      .${className} {
        position: absolute;
        top: 6px;
        left: 6px;
        padding: 0 8px;
        color: white;
        font-size: 16px;
        line-height: 32px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 4px;
        transform: translateZ(100px);
      }
      @media screen and (max-width: 750px) {
        .${className} {
          padding: 0 1vw;
          font-size: 2.5vw;
          line-height: 5vw;
        }
      }
    `);

      // speedPlayDom.innerText = '3 倍快进中';

      pDom && pDom.appendChild(speedPlayDom);
      // const getStyleString = () => {
      //   return Object.keys(styles).reduce((prev, k) => `${prev};${k}: ${styles[k]}`, '');
      // };
      // pDom && pDom.append(`
      // <div
      //   id="${id}"
      //   class="${ID_PREFIX}speed-play-c"
      //   style="${getStyleString()}"
      // >111</div>
      // `);
    }

    return document.querySelector(`#${id}`);
  };
  const { containerDom, videoId, videoDom } = await Store.getCacheOptions();
  const speedPlayDom: HTMLDivElement | null = injectSpeedPlayDom(containerDom);

  if (speedPlayDom) {
    Store.longPressPro = new Press({
      sel: videoId,
      onDoublePress() {
        EB.emit(FN_C_TOGGLE_PLAY);
      },
      onLongPressStart(opts) {
        if (videoPlaying(videoDom)) {
          const direction = getDirection(opts);

          const M = {
            left: {
              text: '0.5 倍慢放中',
              rate: 0.5,
            },
            right: {
              text: '2 倍快放中',
              rate: 2.0,
            },
          };

          speedPlayDom.style.display = 'block';
          speedPlayDom.innerText = M[direction].text;
          videoDom.playbackRate = M[direction].rate;
        }
      },
      onLongPressFinish() {
        speedPlayDom.style.display = 'none';
        speedPlayDom.innerText = '';
        videoDom.playbackRate = 1.0;
      },
    });

    Store.longPressPro.add();
  }
};
const deregisterPressPlayStateEvt = () => {
  if (Store.longPressPro) {
    Store.longPressPro.remove();
    Store.longPressPro = null;
  }
};

const restoreLastPlayTime = async () => {
  const { videoDom } = await Store.getCacheOptions();
  // const item = getParamsItem();
  // const itemLS = getItemLSDetail(item);
  // videoDom.currentTime = itemLS.currentTime;
  // videoDom.currentTime = 420;
  // videoDom.volume = 0.25;
  // https://www.runoob.com/tags/ref-av-dom.html
  EB.on(FN_V_SLIDE_UPDATE, ({ val }) => {
    videoDom.currentTime = val;
  });
};

const registerTimeupdateEvt = async () => {
  const { videoDom } = await Store.getCacheOptions();
  // const item = getParamsItem();
  const updateCurrentTime = () => {
    const {
      currentTime,
      duration,
    } = videoDom;
    // console.log(`当前的时间点是${currentTime}, 视频长度是${duration}`);
    EB.emit(FN_V_TIMEUPDATE, { currentTime, duration });
    // updateItemLSDetail(item, { currentTime });
  };
  Store.timeupdateFn = throttle(updateCurrentTime, 1000);
  Store.canPlayFn = () => {
    const {
      currentTime,
      duration,
    } = videoDom;
    EB.emit(FN_V_CAN_PLAY, { currentTime, duration });
  };

  if (Store.timeupdateFn) {
    videoDom.addEventListener('canplay', Store.canPlayFn, false);
    videoDom.addEventListener('timeupdate', Store.timeupdateFn, false);
  }
};
const deregisterTimeupdateEvt = async () => {
  const { videoDom } = await Store.getCacheOptions();
  if (Store.timeupdateFn) {
    videoDom.removeEventListener('timeupdate', Store.timeupdateFn, false);
  }
};

const keydownEvt = (e) => {
  const updateVideoAttr = async (
    {
      attr,
      delta,
    }: {
      attr: 'currentTime' | 'volume';
      delta: number;
    },
  ) => {
    const { videoDom } = await Store.getCacheOptions();
    videoDom[attr] += delta;
  };
  handleKeyControl(e, {
    onUp() {
      updateVideoAttr({ attr: 'volume', delta: 0.1 });
    },
    onDown() {
      updateVideoAttr({ attr: 'volume', delta: -0.1 });
    },
    onLeft() {
      updateVideoAttr({ attr: 'currentTime', delta: -5 });
    },
    onRight() {
      updateVideoAttr({ attr: 'currentTime', delta: 5 });
    },
  });
};
const registerShortcutKeysEvt = () => {
  document.addEventListener('keydown', keydownEvt, false);
};
const deregisterShortcutKeysEvt = () => {
  document.removeEventListener('keydown', keydownEvt, false);
};

export function afterCreated(options: I_InitPlayer_Created_Props) {
  Store.cacheOptions = options;

  restoreLastPlayTime();

  registerPressPlayStateEvt();
  registerTimeupdateEvt();
  registerShortcutKeysEvt();
}

export function beforeDestroy() {
  deregisterPressPlayStateEvt();
  deregisterTimeupdateEvt();
  deregisterShortcutKeysEvt();

  Store.cacheOptions = null;
}

export default {};
