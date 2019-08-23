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
  const onChange = (event) => context.setConfig({ [configKey]: event.target.value });
  const onKeyDown = (event) => {
    if (!['ArrowUp', 'ArrowDown'].includes(event.key)) return;
    event.preventDefault();
    const valueParts = event.target.value.match(/(.*?)(-?[\d\.]+)(.*)/);
    if (!valueParts) return;
    const number = valueParts[2].includes('.') ? parseFloat(valueParts[2]) : parseInt(valueParts[2])
    const multiplier = (event.altKey && 0.1) || (event.ctrlKey && 100) || 1;
    const newNumber = number + (event.key === 'ArrowUp' ? multiplier : -multiplier);
    const newValue = `${valueParts[1]}${Math.round(newNumber * 10) / 10}${valueParts[3]}`;
    context.setConfig({ [configKey]: newValue });
  }
  return (
    <div className={styles.field}>
      <div>{props.label}</div>
      <input value={config[configKey]} onChange={onChange} onKeyDown={onKeyDown}></input>
    </div>
  );
}

export default Field;
