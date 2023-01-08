import * as React from 'react';

import styles from '@/index.module.scss';
import EB, { FN_V_CAN_PLAY, FN_V_TIMEUPDATE } from '@/utils/event-bus';
import { formatSeconds } from '@/utils/date';

export default (props) => {
  const {
    videoId,
  } = props;

  const [currentTime, setCurrentTime] = React.useState<number | undefined>(0);
  const [duration, setDuration] = React.useState<number | undefined>(0);

  React.useEffect(() => {
    EB.on(FN_V_TIMEUPDATE, (opts) => {
      setCurrentTime(opts?.currentTime);
    });
    EB.on(FN_V_CAN_PLAY, (opts) => {
      setCurrentTime(opts?.currentTime);
      setDuration(opts?.duration);
    });
  }, [
    videoId,
  ]);

  return (
    <div className={styles.PlayProgressText}>
      {formatSeconds(currentTime)} / {formatSeconds(duration)}
    </div>
  );
};

