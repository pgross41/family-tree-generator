import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ChildNode.module.css';

/**
 * A child and their spouse on the tree
 */
const ChildNode = (props) => {
  const name = (props.name || '') + (props.spouseName ? ' +' : '');
  const date = props.born + (props.died ? ` - ${props.died}` : '');
  const spouseName = props.spouseName || '';
  const spouseDate = props.spouseBorn + (props.spouseDied ? ` - ${props.spouseDied}` : '');
  return (
    <TreeNode position={props.calculations} className={styles.childNode}>
        <div className={styles.member}>
          <div className={styles.name}>{name}</div>
          <div className={styles.date}>{date}</div>
        </div>
        <div className={styles.spouse}>
          <div className={styles.name}>{spouseName}</div>
          <div className={styles.date}>{spouseDate}</div>
        </div>
    </TreeNode >
  );
}

export default ChildNode;
