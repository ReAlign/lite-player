/* eslint-disable react/no-unknown-property */
import * as React from 'react';
import { initPlayer } from '@/core';
import styles from './index.module.scss';
import {
  CONTAINER_ID as containerId,
  VIDEO_ID as videoId,
} from '@/config';
import { afterCreated, beforeDestroy } from '@/utils/life-cycles';
import Controls from '@/components/controls';

export default function LitePlayer(props: IF_LitePlayer_Props) {
  const {
    videoUrl = '',
  } = props;

  React.useEffect(() => {
    initPlayer({
      containerId,
      videoId,
      videoUrl,
      created: afterCreated,
    });

    return () => {
      beforeDestroy();
    };
  }, [videoUrl]);

  return (
    <div id={containerId} className={styles.XPlayerContainer}>
      <video
        id={videoId}
        className={styles.XPlayerVideo}
        controls={false}
        playsInline
        webkit-playsinline="true"
        x5-video-player-type="h5-page"
        x5-video-orientation="landscape|portrait"
      />
      <Controls containerId={containerId} videoId={videoId} {...props} />
    </div>
  );
}

