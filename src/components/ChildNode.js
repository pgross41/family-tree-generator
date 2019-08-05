import React from 'react';
import TreeNode from './TreeNode.js';

/**
 * A child and their spouse on the tree
 */
const ChildNode = (props) => {
  const name = (props.name || '') + (props.spouseName ? ' +' : '');
  const date = props.born + (props.died ? ` - ${props.died}` : '');
  const spouseName = props.spouseName || '';
  const spouseDate = props.spouseBorn + (props.spouseDied ? ` - ${props.spouseDied}` : '');
  return (
    <TreeNode>
      <div className="member">
        <div className="name">{name}</div>
        <div className="date">{date}</div>
      </div>
      <div className="spouse">
        <div className="name">{spouseName}</div>
        <div className="date">{spouseDate}</div>
      </div>
    </TreeNode >
  );
}

export default ChildNode;
