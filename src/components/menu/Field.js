import React from 'react';
import styles from './Field.module.css';
import Context from './../Context';

/**
 * Single field in the config panel
 */
const Field = (props) => {
  const context = React.useContext(Context);
  const config = context.config;
  const configKey = props.configKey;
  return (
    <div className={styles.field}>
      <div>{props.label}</div>
      <input defaultValue={config[configKey]}></input>
    </div>
  );
}

export default Field;
