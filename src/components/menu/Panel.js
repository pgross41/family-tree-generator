import React from 'react';
import styles from './Panel.module.css';
import { Context } from './../Context';
import ConfigFields from './ConfigFields';
import ExportView from './ExportView';
import ImportView from './ImportView';
import ViewButton from './ViewButton';
import { toTitleCase } from './../../util/helpers';
import views from './../../util/views';
import {
  MdSettings, MdFileDownload, MdFileUpload, MdZoomIn, MdZoomOut, MdMenu, MdChevronRight
} from "react-icons/md";

/**
 * Popout tools panel
 */
const Panel = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const menuOpen = props.menuOpen;
  const setView = (view) => dispatch(["setSelectedView", view])
  const selectedView = state.selectedView || views.SETTINGS;
  const className = `${styles.panel}${menuOpen ? '' : ` ${styles.closed}`}`
  const zoom = state.config.zoom;
  const increaseZoom = (amount) => dispatch(["setConfig", { zoom: zoom + amount }])
  return (
    <div className={className}>
      <div className={styles.panelButtons}>
        <div className={styles.panelButton} onClick={() => props.setMenuOpen(!menuOpen)} title={menuOpen ? "Open Menu" : "Close Menu"}>
          {menuOpen ? <MdChevronRight /> : <MdMenu />}
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
          <h1>
            {toTitleCase(selectedView)}
            <ViewButton view={views.EXPORT} buttonIcon={<MdFileUpload />} setView={setView} />
            <ViewButton view={views.IMPORT} buttonIcon={<MdFileDownload />} setView={setView} />
            <ViewButton view={views.SETTINGS} buttonIcon={<MdSettings />} setView={setView} />
          </h1>
          {selectedView === views.SETTINGS && <ConfigFields />}
          {selectedView === views.IMPORT && <ImportView />}
          {selectedView === views.EXPORT && <ExportView />}
        </div>
      </div>
    </div>
  );
}

export default Panel;
