import React from 'react';
import styles from './TreeCanvas.module.css';
import { Context } from './Context';

const TreeCanvas = (props) => {
  const { state } = React.useContext(Context);
  const style = { marginRight: props.menuOpen ? undefined : 0 }
  const zoomStyle = { zoom: state.config.zoom };
  return (
    <div  id="treeCanvas" className={styles.treeCanvas} style={style}>
      <div style={zoomStyle}>
        {props.children}
      </div>
    </div >
  );
}

export default TreeCanvas;
