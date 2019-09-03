import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ChildNode.module.css';

/**
 * A child and their spouse on the tree
 */
const ChildNode = (props) => {
  const nbsp = '\u00A0';
  const name = (props.name || nbsp) + (props.spouseName ? ' +' : nbsp);
  const date = props.born + (props.died ? ` - ${props.died}` : nbsp);
  const spouseName = props.spouseName || nbsp;
  const spouseDate = props.spouseBorn + (props.spouseDied ? ` - ${props.spouseDied}` : nbsp);
  const leftOrRightClassName = styles[props.half] || nbsp;
  return (
    <TreeNode half={props.half} style={props.style} className={styles.childNode}>
      <div className={leftOrRightClassName}>
        <div className={styles.member}>
          <div className={styles.name}>{name}</div>
          <div className={styles.date}>{date}</div>
        </div>
        {styles.spouse && <div className={styles.spouse}>
          <div className={styles.name}>{spouseName}</div>
          <div className={styles.date}>{spouseDate}</div>
        </div>}
      </div>
    </TreeNode >
  );
}

export default ChildNode;
