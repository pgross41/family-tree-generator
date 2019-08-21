import React from 'react';
import styles from './Title.module.css';

/**
 * The name of the family
 */
const Title = (props) => {
  const config = props.config
  return (
    <div className={styles.title} style={{ width: config.treeWidth }}>
      {config.title}
      <div className={styles.subTitle}>
        {config.subTitle}
      </div>
    </div>
  );
}

export default Title;
