import React from 'react';
import styles from './ConfigField.module.css';
import { Context } from './../Context';
import { handleNumberFieldArrowKey } from '../../util/eventHandlers';

/**
 * Single field in the config panel
 */
const ConfigField = (props) => {
  const { state, dispatch } = React.useContext(Context);
  return (
    <div className={styles.configField}>
      <div>{props.label}</div>
      <input
        value={state.config[props.configKey]}
        onChange={(event) => dispatch(["setConfig", { [props.configKey]: event.target.value }])}
        onKeyDown={(event) => dispatch(["setConfig", { [props.configKey]: handleNumberFieldArrowKey(event) }])}
      />
    </div>
  );
}

export default ConfigField;
