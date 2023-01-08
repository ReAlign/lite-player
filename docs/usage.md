---
sidebar_label: 用法
---

> LitePlayer

```jsx preview
import LitePlayer from 'lite-player';
import styles from './usage.module.css';
import noop from './usage.js';

export default function App () {
  return (
    <div className={styles.usageContainer}>
      <LitePlayer videoUrl="https://cdn.zoubuting.com/20210704/kidqTPcu/1200kb/hls/index.m3u8" />
    </div>
  )
}
```
