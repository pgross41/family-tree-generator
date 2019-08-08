import React from 'react';
import Tree from './Tree.js';
import Title from './Title.js';
import config from './../config.js';
import parse from '../parse.js';
import styles from './App.module.css';
import pattern from './../images/svg/leaf-square-2.svg';

/**
 * Wrapper component for full application
 */
const App = () => {
  const familyData = parse(config.data);
  return (
    <div className={styles.app}>
      <Tree familyData={familyData} />
      <Title fullName={familyData.family.name} />
      <svg height="1000" width="1000" viewBox="-500 -500 1000 1000" >
        <defs>
          <pattern id="leaf-square" patternUnits="userSpaceOnUse" width="215" height="162">
            <image href={pattern} x="0" y="0" width="215" height="162" />
          </pattern>
        </defs>
        {/* <rect fill="url(#leaf-square)" x="0" y="0" height="500" width="500"></rect> */}
        {svg()}
      </svg>
    </div >
  );
}

const svg = () => {
  // const svgEl = document.querySelector('svg');
  const percent = 0.75;

  // destructuring assignment sets the two variables at once
  // const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
  const [startX, startY] = [0, -500];
  
  // each slice starts where the last slice ended, so keep a cumulative percent
  
  // const [endX, endY] = getCoordinatesForPercent(cumulativePercent*1000);
  const [endX, endY] = [-500, 0];
  console.log(startX, startY);
  console.log(endX, endY);

  // if the slice is more than 50%, take the large arc (the long way around)
  const largeArcFlag = percent > .5 ? 1 : 0;

  // create an array and join it just for code readability
  const pathData = [
    `M ${startX} ${startY}`, // Move
    `A 500 500 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
    `L 0 0`, // Line
  ].join(' ');

  // create a <path> and append it to the <svg> element
  return <path d={pathData} fill='CornflowerBlue' />
}

export default App;
