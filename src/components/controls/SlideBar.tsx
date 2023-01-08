import * as React from 'react';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import EB, {
  FN_V_CAN_PLAY,
  FN_V_TIMEUPDATE,
  FN_V_SLIDE_UPDATE,
} from '@/utils/event-bus';

import styles from '@/index.module.scss';

export default () => {
  const [maxVal, setMaxVal] = React.useState(0);
  const [plan, setPlan] = React.useState<number>(0);

  React.useEffect(() => {
    EB.on(FN_V_CAN_PLAY, (opts: any) => {
      setMaxVal(opts?.duration);
    });
    EB.on(FN_V_TIMEUPDATE, (opts: any) => {
      setPlan(opts?.currentTime);
    });
  }, []);

  return (
    <div className={styles.ControlsSlideBarContainer}>
      <InputRange
        maxValue={maxVal}
        minValue={0}
        value={plan}
        formatLabel={() => ''}
        onChange={(val: number) => { setPlan(val); }}
        onChangeComplete={(val: number) => {
          console.log(val);
          EB.emit(FN_V_SLIDE_UPDATE, { val });
        }}
      />
    </div>
  );
};

