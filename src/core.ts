/* eslint-disable @iceworks/best-practices/no-js-in-ts-project */
/* eslint-disable no-console */
import Hls from 'hls.js';

const _: I_Core_Help = {
  containerId: '',
  containerDom: null,
  videoId: '',
  videoDom: null,
  getCommonArgs(): I_InitPlayer_Return {
    return {
      containerId: _.containerId,
      containerDom: _.containerDom,
      videoId: _.videoId,
      videoDom: _.videoDom,
    };
  },
  initData(options: I_InitPlayer_Options) {
    const {
      containerId = '',
      videoId = '',
    } = options;

    _.containerId = `#${containerId}`;
    _.videoId = `#${videoId}`;
    _.containerDom = document.querySelector(_.containerId);
    _.videoDom = document.querySelector(_.videoId);
  },
  initPlayer(options: I_InitPlayer_Options) {
    const {
      videoUrl = '',
      created = () => { },
    } = options;
    if (_.videoDom) {
      _.videoDom.volume = 0;
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoUrl);
        hls.attachMedia(_.videoDom);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          created(_.getCommonArgs());
        });
      } else if (_.videoDom.canPlayType('application/vnd.apple.mpegurl')) {
        _.videoDom.src = videoUrl;
        _.videoDom.addEventListener('loadedmetadata', () => {
          try {
            created(_.getCommonArgs());
          } catch (error) {
            console.log(error);
          }
        });
      }
    }
  },
};

export function initPlayer(options: I_InitPlayer_Options): I_InitPlayer_Return {
  _.initData(options);
  _.initPlayer(options);

  return _.getCommonArgs();
}

export default {};
