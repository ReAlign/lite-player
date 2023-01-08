import * as React from 'react';
import EB, { FN_C_TOGGLE_PIC_IN_PIC } from '@/utils/event-bus';
import { togglePicInPic } from '@/utils/control-events';
import { $ } from '@/utils/_';
import styles from '@/index.module.scss';

export default ({ videoId }) => {
  const nonsupport = 'pictureInPictureEnabled' in document === false;

  const [isPicInPic, setIsPicInPIc] = React.useState(false);

  const clickEvt = () => {
    EB.emit(FN_C_TOGGLE_PIC_IN_PIC);
  };

  React.useEffect(() => {
    const videoDom: HTMLVideoElement | null = $(videoId) as HTMLVideoElement;
    EB.on(FN_C_TOGGLE_PIC_IN_PIC, () => {
      togglePicInPic(videoId);
    });

    const enterPictureInPictureEvt = () => {
      setIsPicInPIc(() => true);
    };
    const leavePictureInPictureEvt = () => {
      setIsPicInPIc(() => false);
    };

    videoDom.addEventListener('enterpictureinpicture', enterPictureInPictureEvt);
    videoDom.addEventListener('leavepictureinpicture', leavePictureInPictureEvt);

    return () => {
      videoDom.removeEventListener('enterpictureinpicture', enterPictureInPictureEvt);
      videoDom.removeEventListener('leavepictureinpicture', leavePictureInPictureEvt);
    };
  }, []);

  return (
    <>
      {!nonsupport && (
        <div
          className={styles.ControlsItem}
          onClick={clickEvt}
        >
          <svg className="icon" aria-hidden="true">
            <use xlinkHref={`#icon-rp-${isPicInPic ? 'picture-in-picture-exit-fill' : 'picture-in-picture-2-fill'}`} />
          </svg>
        </div>
      )}
    </>
  );
};

