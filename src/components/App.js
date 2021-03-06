import React from 'react';
import TreeCanvas from './TreeCanvas';
import Tree from './tree/Tree';
import Title from './tree/Title';
import ToolsPanel from './menu/Panel';
import styles from './App.module.css';
import { ContextProvider } from './Context';

/**
 * Wrapper component for full application
 */
const App = () => {
  const [menuOpen, setMenuOpen] = React.useState(true); 
  return (
    <div className={styles.app}>
      <ContextProvider>
        <TreeCanvas menuOpen={menuOpen}>
          <Tree />
          <Title />
        </TreeCanvas>
        <ToolsPanel menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      </ContextProvider>
    </div >
  );
}

export default App;
