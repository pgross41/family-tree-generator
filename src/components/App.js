import React from 'react';
import Tree from './tree/Tree';
import ToolsPanel from './menu/Panel';
import Title from './tree/Title';
import styles from './App.module.css';
import { ContextProvider } from './Context';


// TODO: 
// - Revert button on import page? or maybe a history
// - Use blank should at least prompt are you sure 
// - Make family a separate button from tree settings? 
// - Support importing CSV 
// - Fix export copy button?
// - Round zoom value 
// - Ability to rotate 90deg by generation  


/**
 * Wrapper component for full application
 */
const App = () => {
  return (
    <div className={styles.app}>
      <ContextProvider>
        <Tree />
        <Title />
        <ToolsPanel />
      </ContextProvider>
    </div >
  );
}

export default App;
