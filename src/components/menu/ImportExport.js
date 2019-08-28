import React from 'react';
import styles from './ImportExport.module.css';
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ImportExport = (props) => {

  // TODO: 
  // - Separate import and export buttons
  // -- Read only if export
  // - Make family a separate button from tree settings? 
  // - CSV options 
  // - Copy button
  // - Round zoom value 

  const { state, dispatch } = React.useContext(Context);
  const exportable = {...state.config, members: state.family.memberData.map(row => row.props)}
  return (
    <div className={styles.importExport}>
      <textarea defaultValue={JSON.stringify(exportable, null, 2)} />
    </div>
  );
}

export default ImportExport;
