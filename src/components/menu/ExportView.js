import React from 'react';
import html2canvas from 'html2canvas';
import styles from './ExportView.module.css';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ExportView = (props) => {

  const { state } = React.useContext(Context);
  const [imgLoading, setImgLoading] = React.useState(false);
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
  const saveImg = async () => {
    setImgLoading(true);
    const width = state.config.treeWidth;
    // Make sure the tree trunk + words fit. TODO: Remove hardcoded 600.
    const height = Math.max(state.config.treeHeight * 2, state.config.treeHeight + 600); 
    const el = (document, id) => document.getElementById(id);
    const canvas = await html2canvas(document.getElementById('treeCanvas'), {
      scale: 3,
      width: width,
      height: height,
      removeContainer: false,
      onclone: (doc) => {
        el(doc, 'root').style.width = `${width}px`;
        el(doc, 'root').style.height = `${height}px`;
        el(doc, 'treeCanvas').style.width = `${width}px`;
        el(doc, 'treeCanvas').style.height = `${height}px`;
      },
    });
    
    canvas.toBlob(blob => {
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.download = `${state.config.title}.png`;
      if(!blob) throw Error("Something went wrong");
      a.href = window.URL.createObjectURL(blob);
      a.click();
      a.remove();
      setImgLoading(false);
    });
  }

  return (
    <div className={styles.exportView}>
      <button onClick={copy} >
        Copy Settings
      </button >
      &nbsp;
      <button onClick={saveCsv} >
        Download Family CSV
      </button >
      &nbsp;
      <button onClick={saveImg} >
        {imgLoading ? 'Please wait...' : 'Download Printable Tree'}
      </button >
      <textarea ref={textAreaEl} readOnly defaultValue={JSON.stringify(data)} />
    </div>
  );
}

export default ExportView;
