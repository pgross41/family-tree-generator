import React from 'react';
import styles from './ConfigField.module.css';
import { Context } from './../Context';
import { handleNumberFieldArrowKey } from '../../util/helpers';

/**
 * Single field in the config panel
 */
const ConfigField = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const onChange = (event) => dispatch(["setConfig", {
    [props.configKey]: props.attrs.type === "checkbox" ? event.target.checked : event.target.value
  }]);
  const onKeyDown = (event) => dispatch(["setConfig", { [props.configKey]: handleNumberFieldArrowKey(event) }]);
  return (
    <div className={styles.configField}>
      <div>{props.label}</div>
      <input
        value={state.config[props.configKey]}
        onChange={onChange}
        onKeyDown={onKeyDown}
        type="number"
        {...props.attrs}
      />
    </div>
  );
}

export default ConfigField;
