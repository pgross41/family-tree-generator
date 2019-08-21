import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './LeafNode.module.css';

import leaves1 from '../../images/longLeaves1.svg';
import leaves2 from '../../images/longLeaves2.svg';
import leaves3 from '../../images/longLeaves3.svg';

import smallLeaves1 from '../../images/shortLeaves1.svg';
import smallLeaves2 from '../../images/shortLeaves2.svg';
import smallLeaves3 from '../../images/shortLeaves3.svg';
import smallLeaves4 from '../../images/shortLeaves4.svg';

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
