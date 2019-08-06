import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ImgNode.module.css';

/**
 * An image drawn on the tree 
 */
const ImgNode = (props) => {
  return (
    <TreeNode style={props.style} className={styles.imgNode}>
      <img
        className={`${styles[props.styleKey]}`}
        src={props.src}
        alt=""
      />
    </TreeNode >
  );
}

export default ImgNode;
