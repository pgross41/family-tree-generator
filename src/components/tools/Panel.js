import React from 'react';
import styles from './Panel.module.css';
import Context from './../Context';
import Fields from './Fields';

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
          <span className={styles.settingsButton} role="img" aria-label="settings">⚙️</span>
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(+0.1)}>
          <span>+</span>
        </div>
        <div className={styles.panelButton} onClick={() => increaseZoom(-0.1)}>
          <span>−</span>
        </div>
      </div>
      <Fields />
    </div>
  );
}

export default Panel;
