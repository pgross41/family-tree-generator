import React from 'react';
import styles from './ExportView.module.css';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ExportView = (props) => {

  // TODO: 
  // - Separate import and export buttons
  // -- Read only if export
  // - Make family a separate button from tree settings? 
  // - CSV options 
  // - Copy button
  // - Round zoom value 

  const { dispatch } = React.useContext(Context);
  const textAreaEl = React.useRef(null);
  const importSettings = (event) => {
    dispatch(["importSettings", JSON.parse(textAreaEl.current.value)])
  }
  return (
    <div className={styles.exportView}>
      <button onClick={importSettings} >
        Load Settings
      </button >
      <textarea placeholder="Paste exported settings here and click 'Load Settings'" ref={textAreaEl} />
    </div >
  );
}

export default ExportView;
