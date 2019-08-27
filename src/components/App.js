import React from 'react';
import Tree from './tree/Tree';
import ToolsPanel from './menu/Panel';
import Title from './tree/Title';
import styles from './App.module.css';
import { ContextProvider } from './Context';


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
