import React from 'react';
import TreeCanvas from './TreeCanvas';
import Tree from './tree/Tree';
import Title from './tree/Title';
import ToolsPanel from './menu/Panel';
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
  const [menuOpen, setMenuOpen] = React.useState(true); // Testing... default should be false
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
