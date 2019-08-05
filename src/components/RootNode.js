import React from 'react';
import TreeNode from './TreeNode.js';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const Child = (props) => {
  return (
    <TreeNode>
      {props.children}
    </TreeNode>
  );
}

export default Child;
