import React from 'react';
import styles from './ExportView.module.css';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ExportView = (props) => {

  const { state } = React.useContext(Context);
  const textAreaEl = React.useRef(null);
  const data = { ...state.config, members: state.family.memberData }
  const copy = () => {
    textAreaEl.current.select();
    document.execCommand("copy");
  }
  const saveCsv = () => {
    const rows = state.family.memberData
    const headers = Object.keys(rows[0]).join(",")
    const csv = `${headers}\n${rows.map(row => `"${Object.values(row).join('","')}"`).join("\n")}`;
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    a.target = '_blank';
    a.download = `${state.config.title}.csv`;
    a.click();
  }
  return (
    <div className={styles.exportView}>
      <button onClick={copy} >
        Copy Settings
      </button >
      &nbsp;
      <button onClick={saveCsv} >
        Downoad Family CSV
      </button >
      <textarea ref={textAreaEl} readOnly defaultValue={JSON.stringify(data)} />
    </div>
  );
}

export default ExportView;
