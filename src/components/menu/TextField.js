import React from 'react';
import styles from './TextField.module.css';
import Context from './../Context';

/**
 * Popout tools textField
 */
const TextField = (props) => {
  const context = React.useContext(Context);
  const config = context.config;
  const configKey = props.configKey;
  const [closed, setClosed] = React.useState(true);
  const zoom = context.config.zoom;
  const increaseZoom = (amount) => context.setConfig({ zoom: zoom + amount })
  return (
    <div className={styles.textField}>
      <div>{props.label}</div>
      <input type="text" defaultValue={config[configKey]}></input>
    </div>
  );
}

export default TextField;
