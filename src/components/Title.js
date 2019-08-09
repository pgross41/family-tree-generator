import React from 'react';
import config from './../config.js';
import styles from './Title.module.css';

/**
 * The name of the family
 */
const Title = (props) => {
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
