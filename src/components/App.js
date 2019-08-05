import React from 'react';
import Tree from './Tree.js';
import config from './../config.js';
import parse from '../parse.js';

/**
 * Wrapper component for full application
 */
const App = (props) => {
  const familyData = parse(config.data);
  return (
    <div className="app">
      <Tree familyData={familyData}/>
    </div>
  );
}

export default App;
