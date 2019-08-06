import React from 'react';
import styles from './TreeNode.module.css';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const TreeNode = (props) => {
  const leftOrRight = props.position.half;
  const style = props.position.style;
  return (
    <div className={styles.treeNode} style={style}>
      <div className={`${props.className} ${styles[leftOrRight]}`}>
        {props.children}
      </div>
    </div>
  );
}

export default TreeNode;
