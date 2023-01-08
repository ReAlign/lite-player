import { $, getPlatform, getEnterFullScreenFn, getExitFullScreenFn } from './_';

export function togglePaly(videoId: string): void {
  const videoPlaying = (vDom: HTMLVideoElement | null): boolean => {
    return vDom ? !vDom.paused : false;
  };

  const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;
  if (videoDom) {
    videoPlaying(videoDom) ? videoDom.pause() : videoDom.play();
  }
}

export function toggleFullscreen(containerId: string, controlsId: string, isFullScreen = false) {
  // const { isDesktop: isMobile } = getPlatform();
  const { isMobile } = getPlatform();
  const containerDom: HTMLVideoElement | null = document.querySelector(`#${containerId}`);
  let fn: Function | boolean = false;
  if (containerDom) {
    if (isFullScreen) {
      if (isMobile) {
        //
      } else {
        fn = getExitFullScreenFn();
        if (fn) {
          fn.call(document);
          fn = false;
        }
      }
    } else {
      // eslint-disable-next-line no-lonely-if
      if (isMobile) {
        const controlsDom: HTMLVideoElement | null = document.querySelector(`#${controlsId}`);

        containerDom.className += ' c-global-full-screen';
        containerDom.style.position = 'fixed';
        containerDom.style.zIndex = '1000';
        if (controlsDom) {
          controlsDom.style.zIndex = '1001';
        }
        fn = true;
      } else {
        fn = getEnterFullScreenFn(containerDom);
        if (fn) {
          fn.call(containerDom);
          fn = true;
        }
      }
    }
  }

  return fn;
}

export function togglePicInPic(videoId: string): void {
  const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;
  if (videoDom !== document.pictureInPictureElement) {
    // 尝试进入画中画模式
    videoDom.requestPictureInPicture();
  } else {
    // 退出画中画
    // eslint-disable-next-line @iceworks/best-practices/recommend-polyfill
    document.exitPictureInPicture();
  }
}

export function handleVoice(videoId: string, num: number, { cumulative = false } = {}) {
  const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;
  if (videoDom) {
    if (cumulative) {
      if (num <= 0) {
        videoDom.volume = Math.max(videoDom.volume + num, 0);
      } else {
        videoDom.volume = Math.min(videoDom.volume + num, 1);
      }
    } else {
      videoDom.volume = num;
    }
  } else {
    //
  }
}
