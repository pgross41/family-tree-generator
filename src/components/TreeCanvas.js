import React from 'react';
import styles from './TreeCanvas.module.css';
import cn from 'classnames';
import { Context } from './Context';

const TreeCanvas = (props) => {
  const { state } = React.useContext(Context);
  const el = React.useRef();
  const style = { marginRight: props.menuOpen ? undefined : 0 }
  const zoomStyle = { zoom: state.config.zoom };
  const className = cn(styles.treeCanvas, state.config.debugMode && 'debugMode');
  const mouse = {
    isDown: false,
    startX: undefined,
    startY: undefined,
    scrollLeft: undefined,
    startTop: undefined,
  }

  const mouseDown = (event) => {
    el.current.style.cursor = 'grabbing';
    mouse.isDown = true;
    mouse.startX = event.pageX - el.current.offsetLeft;
    mouse.startY = event.pageY - el.current.offsetTop;
    mouse.scrollLeft = el.current.scrollLeft;
    mouse.scrollTop = el.current.scrollTop;
  };

  const mouseLeave = () => {
    el.current.style.cursor = '';
    mouse.isDown = false
  };

  const mouseMove = (event) => {
    if (!mouse.isDown) return;
    event.preventDefault();
    const x = event.pageX - el.current.offsetLeft;
    const y = event.pageY - el.current.offsetTop;
    el.current.scrollLeft = mouse.scrollLeft - (x - mouse.startX);
    el.current.scrollTop = mouse.scrollTop - (y - mouse.startY);

  };

  return (
    <div
      id="treeCanvas"
      className={className}
      style={style}
      ref={el}
      onMouseDown={mouseDown}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseLeave}
      onMouseMove={mouseMove}
    >
      <div style={zoomStyle}>
        {props.children}
      </div>
    </div >
  );
}

export default TreeCanvas;
