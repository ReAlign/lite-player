import * as React from 'react';
import styles from './index.module.scss';

const firstCharUpperCase = (str: string) =>
  str.slice(0, 1).toUpperCase() + str.slice(1).toLowerCase();

export default function LPDropdown({
  labelList = [],
  itemClick,
  align = 'left',
  children,
}: {
  labelList: Array<{ label: string; key: string }>;
  itemClick: (item: { label: string; key: string }) => void;
  align?: 'left' | 'right' | 'middle';
  children: any;
}) {
  const UUID = `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  const triggerId = `j-trigger-${UUID}`;
  const listId = `j-list-ul-${UUID}`;

  const labelItemClickEvt = (item: { label: string; key: string }) => {
    itemClick(item);
  };

  const [listDisplayed, setListDisplayed] = React.useState(false);

  const bodyClickEvt = (event: any) => {
    const listDom = document.getElementById(listId);

    if (listDom) {
      if (listDisplayed === false && event.currentTarget.id === triggerId) {
        listDom.style.zIndex = '3';
        listDom.style.height = 'auto';
        setListDisplayed(true);
      } else {
        listDom.style.zIndex = '1';
        listDom.style.height = '0';
        setListDisplayed(false);
      }
      event.preventDefault();
      event.stopPropagation();
    }
  };

  document.onclick = bodyClickEvt;

  return (
    <div className={styles.LPDropdownContainer}>
      <div
        id={triggerId}
        className={styles.LPDropdownTriggerContainer}
        onClick={bodyClickEvt}
      >
        {children}
      </div>
      <ul
        id={listId}
        className={`${styles.LPDropdownListUl} ${styles[`LPDropdownListUlAlign${firstCharUpperCase(align)}`]}`}
      >
        {labelList.map((item) => {
          return (
            <li key={item.key} onClick={() => { labelItemClickEvt(item); }}>{item.label}</li>
          );
        })}
      </ul>
    </div>
  );
}
