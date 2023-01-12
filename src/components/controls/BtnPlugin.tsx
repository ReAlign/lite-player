import * as React from 'react';
import LPDropdown from '@/components/LPDropdown';

import styles from '@/index.module.scss';

export default (props: IF_LitePlayer_Props) => {
  const {
    pluginMenu = [],
  } = props;

  return (
    <>
      {pluginMenu && pluginMenu.length ? (
        <div
          className={styles.ControlsItem}
        >
          <LPDropdown
            align="right"
            labelList={pluginMenu}
            itemClick={(item, idx) => {
              const f = pluginMenu[idx].fn;
              f && f();
            }}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icon-rp-plugin" />
            </svg>
          </LPDropdown>
        </div>
      ) : null}
    </>
  );
};

