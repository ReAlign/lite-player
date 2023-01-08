import * as React from 'react';
import EB, {
  FN_C_TOGGLE_PLAY,
} from '@/utils/event-bus';
import { togglePaly } from '@/utils/control-events';
import { $ } from '@/utils/_';
import styles from '@/index.module.scss';

export default (props: any) => {
  const {
    videoId,
  } = props;
  const [isPlaying, setIsPlaying] = React.useState(false);

  const clickEvt = () => {
    EB.emit(FN_C_TOGGLE_PLAY);
  };

  React.useEffect(() => {
    const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;

    EB.on(FN_C_TOGGLE_PLAY, () => {
      togglePaly(videoId);
    });

    const onPlayEvt = () => {
      setIsPlaying(() => true);
    };
    const onPauseEvt = () => {
      setIsPlaying(() => false);
    };

    videoDom.addEventListener('play', onPlayEvt);
    videoDom.addEventListener('pause', onPauseEvt);

    return () => {
      videoDom.removeEventListener('play', onPlayEvt);
      videoDom.removeEventListener('pause', onPauseEvt);
    };
  }, []);

  return (
    <div
      className={styles.ControlsItem}
      onClick={clickEvt}
    >
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#icon-rp-${isPlaying ? 'pause' : 'play'}`} />
      </svg>
    </div>
  );
};

