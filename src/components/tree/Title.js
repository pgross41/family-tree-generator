import React from 'react';
import styles from './Title.module.css';
import { Context } from './../Context';

/**
 * The name of the family
 */
const Title = (props) => {
  const { state } = React.useContext(Context);
  const config = state.config
  return (
    <div className={styles.title} style={{ width: config.treeWidth, zoom: config.zoom }}>
      {config.title}
      <div className={styles.subTitle}>
        {config.subTitle}
      </div>
    </div>
  );
}

export default Title;
