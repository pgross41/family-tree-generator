import React from 'react';
import TreeCanvas from './TreeCanvas';
import Tree from './tree/Tree';
import Title from './tree/Title';
import ToolsPanel from './menu/Panel';
import styles from './App.module.css';
import { ContextProvider } from './Context';


// TODO: 
// - Json numbers should all be numbers (not just tree size) 
// - Ability to rotate 90deg by generation  
// - Font size
// - Draw divider leaves instead of adding to childleaves
// - Support importing CSV 
// - Revert button on import page? or maybe a history
// - Zoom in on selected member


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
