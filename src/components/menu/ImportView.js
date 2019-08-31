import React from 'react';
import styles from './ImportView.module.css';
import { Context } from './../Context';

const date = new Date();
const blankConfig = {
  "debugMode": false,
  "zoom": 1,
  "title": "My Family",
  "subTitle": `${date.toLocaleString('default', { month: 'long' })}, ${date.getFullYear()}`,
  "treeWidth": "2000px",
  "treeHeight": "1000px",
  "treeAngle": 180,
  "minAngleBetweenSibs": 5,
  "childOffsetFactor": 1.0,
  "edgeLeafOffsetAngle": 0,
  "members": [{}]
}

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
  const setBlank = () => window.confirm("This will erase all your settings, are you sure?") && importSettings('{}');
  const onChange = (event) => importSettings(event.target.value);
  return (
    <div className={styles.exportView}>
      <button onClick={setBlank} >
        Use blank
      </button >
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
