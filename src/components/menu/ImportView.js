import React from 'react';
import styles from './ImportView.module.css';
import blankConfig from '../../config/blank';
import Family from '../../models/Family';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ImportView = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const [text, setText] = React.useState();
  const [error, setError] = React.useState();
  const importSettings = (text) => {
    try {
      setText(text);
      const settings = text.trim().substr(0, 1) === "{" ? JSON.parse(text) : { members: Family.parseCsv(text) };
      dispatch(["importSettings", { ...state.config, ...settings }])
      setError(null);
    } catch (error) {
      setError(error.toString());
    }
  }
  const setBlank = () => importSettings(JSON.stringify(blankConfig));
  const onChange = (event) => importSettings(event.target.value);
  return (
    <div className={styles.exportView}>
      <button onClick={setBlank} >
        Use blank
      </button >
      <textarea
        onChange={onChange}
        onInput={onChange}
        placeholder="Paste exported settings or family CSV here"
        value={text}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div >
  );
}

export default ImportView;
