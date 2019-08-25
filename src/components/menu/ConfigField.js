import React from 'react';
import styles from './ConfigField.module.css';
import Context from './../Context';
import { handleNumberFieldArrowKey } from '../../util/eventHandlers';

/**
 * Single field in the config panel
 */
const ConfigField = (props) => {
  const context = React.useContext(Context);
  return (
    <div className={styles.configField}>
      <div>{props.label}</div>
      <input
        value={context.config[props.configKey]}
        onChange={(event) => context.setConfig({ [props.configKey]: event.target.value })}
        onKeyDown={(event) => context.setConfig({ [props.configKey]: handleNumberFieldArrowKey(event) })}
      />
    </div>
  );
}

export default ConfigField;
