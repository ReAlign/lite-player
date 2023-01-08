import * as React from 'react';
import styles from './index.module.css';

interface ComponentProps {
  /** Title for LitePlayer. */
  title: string;
}

export default function LitePlayer(props: ComponentProps) {
  const { title = '🎉🎉🎉 Lite Player Coming soon! 🎉🎉🎉' } = props;

  return (
    <div className={styles.LitePlayer}>{title}</div>
  );
}
