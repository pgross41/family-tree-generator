import React from 'react';
import styles from './TreeNode.module.css';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const TreeNode = React.forwardRef((props, ref) => {
  return (
    <div ref={ref} className={styles.treeNode} style={props.style}>
      <div className={props.className}>
        {props.children}
      </div>
    </div>
  );
})

export default TreeNode;
