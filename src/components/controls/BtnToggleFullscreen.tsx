import * as React from 'react';
import EB, { FN_C_TOGGLE_FULLSCREEN } from '@/utils/event-bus';
import { toggleFullscreen } from '@/utils/control-events';
import styles from '@/index.module.scss';

let __isFullscreen__ = false;
export default (props) => {
  const {
    containerId,
    controlsId,
  } = props;

  const [isFullscreen, setIsFullscreen] = React.useState(false);

  const clickEvt = () => {
    EB.emit(FN_C_TOGGLE_FULLSCREEN);
  };

  React.useEffect(() => {
    EB.on(FN_C_TOGGLE_FULLSCREEN, () => {
      const r = toggleFullscreen(containerId, controlsId, __isFullscreen__);
      __isFullscreen__ = r;
      setIsFullscreen(() => r);
    });
  }, []);

  return (
    <div
      className={styles.ControlsItem}
      onClick={clickEvt}
    >
      <svg className="icon" aria-hidden="true">
        <use xlinkHref={`#icon-rp-${isFullscreen ? 'fullscreen-exit' : 'fullscreen-enter'}`} />
      </svg>
    </div>
  );
};

