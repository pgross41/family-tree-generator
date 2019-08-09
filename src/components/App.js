import React from 'react';
import Tree from './Tree.js';
import Title from './Title.js';
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
      <Title fullName={familyData.family.name} />
    </div >
  );
}

export default App;
