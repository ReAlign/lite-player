import * as React from 'react';
import EB, {
  FN_C_HANDLE_VOICE_OFF,
  FN_C_HANDLE_VOICE_PLUS_TEN_PERCENT,
  FN_C_HANDLE_VOICE_MINUS_TEN_PERCENT,
} from '@/utils/event-bus';
import { handleVoice } from '@/utils/control-events';
import { $ } from '@/utils/_';
import styles from '@/index.module.scss';

export default (props: any) => {
  const {
    videoId,
  } = props;
  const [voice, setVoice] = React.useState(0);

  const setVoiceOffEvt = () => {
    EB.emit(FN_C_HANDLE_VOICE_OFF);
  };
  const setVoiceMinusTenPercentEvt = () => {
    EB.emit(FN_C_HANDLE_VOICE_MINUS_TEN_PERCENT);
  };
  const setVoicePlusTenPercentEvt = () => {
    EB.emit(FN_C_HANDLE_VOICE_PLUS_TEN_PERCENT);
  };

  React.useEffect(() => {
    const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;

    EB.on(FN_C_HANDLE_VOICE_OFF, () => {
      handleVoice(videoId, 0);
    });
    EB.on(FN_C_HANDLE_VOICE_MINUS_TEN_PERCENT, () => {
      handleVoice(videoId, -0.1, { cumulative: true });
    });
    EB.on(FN_C_HANDLE_VOICE_PLUS_TEN_PERCENT, () => {
      handleVoice(videoId, 0.1, { cumulative: true });
    });

    const volumeChangeEvt = () => {
      setVoice(videoDom.volume);
    };

    videoDom.addEventListener('volumechange', volumeChangeEvt);

    return () => {
      videoDom.addEventListener('volumechange', volumeChangeEvt);
    };
  }, []);

  return (
    <>
      <div className={styles.ControlsGap} />

      <div
        className={styles.ControlsItem}
        onClick={setVoiceOffEvt}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-rp-sound-off" />
        </svg>
      </div>

      <div
        className={styles.ControlsItem}
        onClick={setVoiceMinusTenPercentEvt}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-rp-volume-down" />
        </svg>
      </div>

      <div
        className={styles.ControlsItem}
        onClick={setVoicePlusTenPercentEvt}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-rp-volume-up" />
        </svg>
      </div>

      <div
        className={styles.ControlsItemVoiceDisplay}
      >
        <svg className="icon-min" aria-hidden="true">
          <use xlinkHref="#icon-rp-sound-on" />
        </svg>
        <span className={styles.VoiceDisplayBoard}>{`${Math.ceil(voice * 10) * 10}%`}</span>
      </div>
    </>
  );
};

