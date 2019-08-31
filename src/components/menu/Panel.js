import React from 'react';
import styles from './Panel.module.css';
import { Context } from './../Context';
import ConfigFields from './ConfigFields';
import ExportView from './ExportView';
import ImportView from './ImportView';
import ViewButton from './ViewButton';
import { makeEnum, toTitleCase } from './../../util/helpers';
import {
  MdSettings, MdFileDownload, MdFileUpload, MdZoomIn, MdZoomOut, MdMenu, MdChevronRight
} from "react-icons/md";

const views = makeEnum('SETTINGS', 'IMPORT', 'EXPORT');

/**
 * Popout tools panel
 */
const Panel = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const menuOpen = props.menuOpen;
  const [view, setView] = React.useState(views.SETTINGS); // Testing... default should be SETTINGS
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
            {toTitleCase(view)}
            <ViewButton view={views.EXPORT} buttonIcon={<MdFileUpload />} setView={setView} />
            <ViewButton view={views.IMPORT} buttonIcon={<MdFileDownload />} setView={setView} />
            <ViewButton view={views.SETTINGS} buttonIcon={<MdSettings />} setView={setView} />
          </h1>
          {view === views.SETTINGS && <ConfigFields />}
          {view === views.IMPORT && <ImportView />}
          {view === views.EXPORT && <ExportView />}
        </div>
      </div>
    </div>
  );
}

export default Panel;
