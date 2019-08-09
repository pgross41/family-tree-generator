import React from 'react';
import pattern from './../images/squareLeaf2.svg';
import styles from './TreePie.module.css';

/**
 * The pie chart that is the tree's background
 */
const TreePie = (props) => {

  const r = props.r;
  const thetaEnd = Math.PI * 2 + (Math.PI - props.thetaStart);
  const borderOffset = Math.PI / 100;
  const startX = Math.cos(props.thetaStart + borderOffset) * r
  const startY = Math.sin(props.thetaStart + borderOffset) * r;
  const endX = Math.cos(thetaEnd + borderOffset) * r;
  const endY = Math.sin(thetaEnd + borderOffset) * r;
  const largeArcFlag = thetaEnd - props.thetaStart > Math.PI ? 1 : 0;
  const pathData = [
    `M ${startX} ${startY}`, // Move
    `A ${r} ${r} 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
    `L 0 0`, // Line
  ].join(' ');

  // This is totally eyeballed since the viewport is size 2 the pattern needs to shrink
  const patternWidth = 215 / 5;
  const patternHeight = 162 / 5;

  return (
    <svg className={styles.treePie} style={props.style} viewBox="-100 -100 200 200">
      <defs>
        <pattern id="leaf-square" patternUnits="userSpaceOnUse" width={patternWidth} height={patternHeight}>
          <image href={pattern} x="0" y="0" width={patternWidth} height={patternHeight}/>
        </pattern>
      </defs>
      <path d={pathData} fill='url(#leaf-square)' />
      {/* <path d={pathData} fill='blue' /> */}
    </svg>
  );
}

export default TreePie;
