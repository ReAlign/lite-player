import * as React from 'react';
import LPDropdown from '@/components/LPDropdown';
import { copy } from '@/utils/_';

import styles from '@/index.module.scss';

export default (props: any) => {
  const {
    videoUrl,
  } = props;

  const labelList = [
    {
      label: '复制视频地址',
      key: 'copy-video-url',
    },
    {
      label: '菜单1',
      key: 'menu-1',
    },
    {
      label: '菜单2',
      key: 'menu-2',
    },
  ];

  return (
    <div
      className={styles.ControlsItem}
    >
      <LPDropdown
        align="right"
        labelList={labelList}
        itemClick={(item) => {
          if (item.key === labelList[0].key) {
            copy(videoUrl);
          }
        }}
      >
        <svg className="icon" aria-hidden="true">
          <use xlinkHref="#icon-rp-plugin" />
        </svg>
      </LPDropdown>
    </div>
  );
};

