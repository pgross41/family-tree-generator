import React from 'react';
import styles from './Panel.module.css';
import Context from './../Context';
import Fields from './Fields';
import { MdSettings, MdZoomIn, MdZoomOut } from "react-icons/md";

/**
 * Popout tools panel
 */
const Panel = (props) => {
  const context = React.useContext(Context);
  const [closed, setClosed] = React.useState(false); // Testing... default should be true
  const className = `${styles.panel}${closed ? ` ${styles.closed}` : ''}`
  const zoom = context.config.zoom;
  const increaseZoom = (amount) => context.setConfig({ zoom: zoom + amount })
  return (
    <div className={className}>
      <div className={styles.panelButtons}>
        <div className={styles.panelButton} onClick={() => setClosed(!closed)}>
          <span className={styles.settingsButton}><MdSettings /></span>
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(+0.1)}>
          <span><MdZoomIn /></span>
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(-0.1)}>
          <span><MdZoomOut /></span>
        </div>
      </div>
      <Fields />
    </div>
  );
}

export default Panel;
