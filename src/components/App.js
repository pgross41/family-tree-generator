import React, { useState } from 'react';
import Tree from './tree/Tree.js';
import ToolsPanel from './tools/Panel.js';
import Title from './tree/Title.js';
import defaultConfig from './../config.js';
import parse from '../parse.js';
import styles from './App.module.css';
import Context from './Context';



/**
 * Wrapper component for full application
 */
const App = () => {
  const [config, replaceConfig] = useState(defaultConfig);
  const setConfig = (partialConfig) => replaceConfig({ ...config, ...partialConfig })
  const familyData = parse(config.data);
  return (
    <div className={styles.app}>
      <Context.Provider value={{ config, setConfig }}>
        <Tree familyData={familyData} config={config} />
        <Title config={config} />
        <ToolsPanel defaultConfig={defaultConfig} />
      </Context.Provider>
    </div>
  );
}

export default App;
