import React from 'react';
import styles from './Panel.module.css';
import { Context } from './../Context';
import ConfigFields from './ConfigFields';
import ImportExport from './ImportExport';
import { MdSettings, MdImportExport, MdZoomIn, MdZoomOut, MdArrowBack } from "react-icons/md";

/**
 * Popout tools panel
 */
const Panel = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const [closed, setClosed] = React.useState(false); // Testing... default should be true
  const [showImportExport, setShowImportExport] = React.useState(true); // Testing... default should be false
  const toggleImportExport = () => setShowImportExport(!showImportExport);
  const className = `${styles.panel}${closed ? ` ${styles.closed}` : ''}`
  const importExportClassName = `${styles.panelButton} ${styles.importExportButton}`;
  const zoom = state.config.zoom;
  const increaseZoom = (amount) => dispatch(["setConfig", { zoom: zoom + amount }])
  return (
    <div className={className}>
      <div className={styles.panelButtons}>
        <div className={styles.panelButton} onClick={() => setClosed(!closed)} title="Settings">
          <MdSettings />
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(+0.1)} title="Zoom In">
          <MdZoomIn />
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(-0.1)} title="Zoom Out">
          <MdZoomOut />
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentScroll}>
          <h1>Settings
          <div className={importExportClassName} onClick={toggleImportExport} title="Import/Export">
              {showImportExport ? <MdArrowBack /> : <MdImportExport />}
            </div>
          </h1>
          {!showImportExport && <ConfigFields />}
          {showImportExport && <ImportExport />}
        </div>
      </div>
    </div>
  );
}

export default Panel;
