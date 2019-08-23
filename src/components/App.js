import React, { useState } from 'react';
import Tree from './tree/Tree.js';
import ToolsPanel from './menu/Panel.js';
import Title from './tree/Title.js';
import defaultConfig from './../config.js';
import parse from '../util/parse.js';
import styles from './App.module.css';
import Context from './Context';



/**
 * Wrapper component for full application
 */
const App = () => {
  const [config, replaceConfig] = useState(defaultConfig);
  const setConfig = (partialConfig) => replaceConfig({ ...config, ...partialConfig });
  const [selectedMember, setSelectedMember] = useState({});
  const familyData = parse(config.members || config.membersCsv);
  const context = { config, setConfig, selectedMember, setSelectedMember }
  return (
    <div className={styles.app}>
      <Context.Provider value={context}>
        <Tree familyData={familyData} />
        <Title />
        <ToolsPanel />
      </Context.Provider>
    </div>
  );
}

export default App;
