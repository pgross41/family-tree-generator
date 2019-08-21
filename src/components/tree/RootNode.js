import React from 'react';
import styles from './RootNode.module.css';
import childStyles from './ChildNode.module.css';

/**
 * A child and their spouse on the tree
 */
const RootNode = (props) => {
  const name = (props.name || '');
  const date = props.born + (props.died ? ` - ${props.died}` : '');
  const spouseName = props.spouseName || '';
  const spouseDate = props.spouseBorn + (props.spouseDied ? ` - ${props.spouseDied}` : '');
  return (
    <div className={styles.rootNode}>
        <div className={`${childStyles.member} ${styles.member}`}>
          <div className={childStyles.name}>{name}</div>
          <div className={childStyles.date}>{date}</div>
        </div>
        <div className={`${childStyles.spouse} ${styles.spouse}`}>
          <div className={childStyles.name}>{spouseName}</div>
          <div className={childStyles.date}>{spouseDate}</div>
        </div>
    </div >
  );
}

export default RootNode;
