import React from 'react';
import styles from './TreeNode.module.css';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const TreeNode = (props) => {
  const leftOrRightClassName = styles[props.half] || '';
  return (
    <div className={styles.treeNode} style={props.style}>
      <div className={`${props.className} ${leftOrRightClassName}`}>
        {props.children}
      </div>
    </div>
  );
}

export default TreeNode;
