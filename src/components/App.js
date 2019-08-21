import React from 'react';
import Tree from './tree/Tree.js';
import Title from './tree/Title.js';
import config from './../config.js';
import parse from '../parse.js';
import styles from './App.module.css';

/**
 * Wrapper component for full application
 */
const App = () => {
  const familyData = parse(config.data);
  return (
    <div className={styles.app}>
      <Tree familyData={familyData} />
      <Title />
    </div >
  );
}

export default App;
