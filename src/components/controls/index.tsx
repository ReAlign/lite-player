// import '@/iconfont/iconfont.js';
import './index.scss';

import * as React from 'react';
import { injectJsTag } from '@/utils/dom';
import Press from '@/utils/press';

import styles from '@/index.module.scss';

import SlideBar from './SlideBar';
import BtnTogglePlay from './BtnTogglePlay';
import BtnGroupHandleVoice from './BtnGroupHandleVoice';
import BtnPlugin from './BtnPlugin';
import BtnTogglePicInPic from './BtnTogglePicInPic';
import BtnToggleFullscreen from './BtnToggleFullscreen';
import TextPlayProgress from './TextPlayProgress';

import { CONTROLS_ID } from '@/config';

const Controls = (props: any) => {
  const {
    containerId,
    videoId,
    videoUrl,
  } = props;
  const [pressPro, setPressPro] = React.useState<Press | null>(null);
  const [controlsBarShow, setControlsBarShow] = React.useState(true);

  React.useEffect(() => {
    if (!pressPro) {
      setPressPro(new Press({
        sel: videoId,
        onSinglePress() {
          setControlsBarShow((v) => !v);
        },
      }));
    }
  }, []);

  React.useEffect(() => {
    pressPro && pressPro.add();
    return () => {
      pressPro && pressPro.remove();
    };
  }, [pressPro]);

  React.useEffect(() => {
    injectJsTag('//at.alicdn.com/t/c/font_3556677_tq45iavge9k.js');
  }, []);

  return (
    <div
      id={CONTROLS_ID}
      className={`${styles.ControlsContainer} ${controlsBarShow ? '' : styles.ControlsContainerHide}`}
    >
      <SlideBar />
      <div style={{ display: 'flex' }}>
        <BtnTogglePlay videoId={videoId} />
        <TextPlayProgress videoId={videoId} />
        <BtnGroupHandleVoice videoId={videoId} />
      </div>

      <div style={{ display: 'flex' }}>
        <BtnPlugin videoUrl={videoUrl} />
        <BtnTogglePicInPic videoId={videoId} />
        <BtnToggleFullscreen containerId={containerId} controlsId={CONTROLS_ID} />
      </div>
    </div>
  );
};

export default Controls;
