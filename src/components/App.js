import React, { useState } from 'react';
import Tree from './tree/Tree';
import ToolsPanel from './menu/Panel';
import Title from './tree/Title';
import defaultConfig from './../config';
import styles from './App.module.css';
import Context from './Context';
import Family from '../models/Family';


/**
 * Wrapper component for full application
 */
const App = () => {
  const [config, replaceConfig] = useState(defaultConfig);
  const setConfig = (partialConfig) => replaceConfig({ ...config, ...partialConfig });
  const [selectedMember, setSelectedMember] = useState({});
  const family = new Family(config.members || config.membersCsv);
  const context = { family, config, setConfig, selectedMember, setSelectedMember }
  return (
    <div className={styles.app}>
      <Context.Provider value={context}>
        <Tree />
        <Title />
        <ToolsPanel />
      </Context.Provider>
    </div>
  );
}

export default App;
