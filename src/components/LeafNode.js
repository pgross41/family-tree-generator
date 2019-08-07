import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './LeafNode.module.css';

import leaves1 from '../images/leaves1.png';
import leaves2 from '../images/leaves2.png';
import leaves3 from '../images/leaves3.png';

import smallLeaves1 from '../images/smallLeaves1.png';
import smallLeaves2 from '../images/smallLeaves2.png';
import smallLeaves3 from '../images/smallLeaves3.png';
import smallLeaves4 from '../images/smallLeaves4.png';

const leaves = [leaves1, leaves2, leaves3];
const smallLeaves = [smallLeaves1, smallLeaves2, smallLeaves3, smallLeaves4];


/**
 * A small leaf image to be drawn on the tree 
 */
const LeafNode = (props) => {
  const leafArray = props.size === "small" ? smallLeaves : leaves;
  return (
    <TreeNode style={props.style} className={styles.leafNode}>
      <img
        className={`${styles.leafNodeImg}`}
        src={leafArray[props.id % leafArray.length]}
        alt=""
      />
    </TreeNode >
  );
}

export default LeafNode;
