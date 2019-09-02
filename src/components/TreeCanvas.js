import React from 'react';
import styles from './TreeCanvas.module.css';
import cn from 'classnames';
import { Context } from './Context';

const TreeCanvas = (props) => {
  const { state } = React.useContext(Context);
  const style = { marginRight: props.menuOpen ? undefined : 0 }
  const zoomStyle = { zoom: state.config.zoom };
  const className = cn(styles.treeCanvas, state.config.debugMode ? 'debugMode' : undefined);
  return (
    <div  id="treeCanvas" className={className} style={style}>
      <div style={zoomStyle}>
        {props.children}
      </div>
    </div >
  );
}

export default TreeCanvas;
