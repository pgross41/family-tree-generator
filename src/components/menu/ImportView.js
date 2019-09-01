import React from 'react';
import styles from './ImportView.module.css';
import blankConfig from '../../config/blank';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ImportView = (props) => {
  const { dispatch } = React.useContext(Context);
  const [text, setText] = React.useState();
  const [error, setError] = React.useState();
  const importSettings = (text) => {
    try {
      setText(text);
      dispatch(["importSettings", { ...blankConfig, ...JSON.parse(text) }])
      setError(null);
    } catch (error) {
      setError(error.toString());
    }
  }
  const setBlank = () => importSettings('{}');
  const onChange = (event) => importSettings(event.target.value);
  return (
    <div className={styles.exportView}>
      <button onClick={setBlank} >
        Use blank
      </button >
      <p><b>Caution</b>: Changes are made in realtime so typing in this box will completely erase current settings</p>
      <textarea
        onChange={onChange}
        onInput={onChange}
        placeholder="Paste exported settings here"
        value={text}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div >
  );
}

export default ImportView;
