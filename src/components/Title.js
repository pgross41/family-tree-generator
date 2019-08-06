import React from 'react';
import config from './../config.js';
import styles from './Title.module.css';

/**
 * The name of the family
 */
const Title = (props) => {
  const lastName = props.fullName.split(' ').pop();
  return (
    <div className={styles.title} style={{ width: config.treeWidth }}>
      The {lastName} Family
      <div className={styles.date}>
        {config.date}
      </div>
    </div>
  );
}

export default Title;
