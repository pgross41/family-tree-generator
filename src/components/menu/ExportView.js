import React from 'react';
import styles from './ExportView.module.css';
import { Context } from './../Context';
import { MdContentCopy, MdInsertDriveFile } from "react-icons/md";

/**
 * The fields in the menu
 */
const ExportView = (props) => {

  const { state } = React.useContext(Context);
  const textAreaEl = React.useRef(null);
  const data = { ...state.config, members: state.family.memberData.map(row => row.props) }
  const copy = () => {
    textAreaEl.current.select();
    document.execCommand("copy");
  }
  const saveCsv = () => {
    const rows = state.family.memberData
    const headers = Object.keys(rows[0].props).join(",")
    const csv = `${headers}\n${rows.map(row => `"${Object.values(row.props).join('","')}"`).join("\n")}`;
    const a = document.createElement('a');
    a.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    a.target = '_blank';
    a.download = `${state.config.title}.csv`;
    a.click();
  }
  return (
    <div className={styles.exportView}>
      <button onClick={copy} >
        Copy Settings <MdContentCopy />
      </button >
      &nbsp;
      <button onClick={saveCsv} >
        Downoad Family CSV <MdInsertDriveFile />
      </button >
      <textarea ref={textAreaEl} readOnly defaultValue={JSON.stringify(data)} />
    </div>
  );
}

export default ExportView;
