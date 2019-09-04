import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ChildNode.module.css';
import cn from 'classnames';
import { Context } from './../Context';

/**
 * A child and their spouse on the tree
 */
const ChildNode = (props) => {
  const { state } = React.useContext(Context);
  const wrapNames = state.config.wrapNames;
  const nbsp = wrapNames ? '' : '\u00A0';
  const showPlusSign = props.spouseName && !wrapNames;
  const name = (props.name || nbsp) + (showPlusSign ? ' +' : nbsp);
  const date = props.born + (props.died ? ` - ${props.died}` : nbsp);
  const spouseName = props.spouseName || nbsp;
  const spouseDate = props.spouseBorn + (props.spouseDied ? ` - ${props.spouseDied}` : nbsp);
  const displayClassName = wrapNames ? styles.inline : styles.inlineBlock;
  const leftOrRightClassName = styles[props.half] || nbsp;
  return (
    <TreeNode style={props.style} className={styles.childNode}>
      <div className={leftOrRightClassName}>
        <div className={cn(displayClassName, styles.member)}>
          <div className={styles.name}>{name}</div>
          <div className={styles.date}>{date}</div>
        </div>
        {props.spouseName && <div className={cn(displayClassName, styles.spouse)}>
          <div className={styles.name}>{spouseName}</div>
          <div className={styles.date}>{spouseDate}</div>
        </div>}
      </div>
    </TreeNode >
  );
}

export default ChildNode;
