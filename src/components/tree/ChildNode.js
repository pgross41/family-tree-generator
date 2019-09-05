import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ChildNode.module.css';
import cn from 'classnames';
import moment from 'moment';
import blankConfig from './../../config/blank';
import { Context } from './../Context';

/**
 * A child and their spouse on the tree
 */
const ChildNode = (props) => {
  const { state } = React.useContext(Context);
  const format = (date) => moment(date, ['DDMMMMY', 'MMMMDDY']).format(state.config.dateFormat || blankConfig.dateFormat);
  const wrapNames = state.config.wrapNames;
  const blank = wrapNames ? '' : '\u00A0';
  const showPlusSign = props.spouseName && !wrapNames;
  const name = (props.name || blank) + (showPlusSign ? ' +' : blank);
  const date = format(props.born) + (props.died ? ` - ${format(props.died)}` : blank);
  const spouseName = props.spouseName || blank;
  const spouseDate = format(props.spouseBorn) + (props.spouseDied ? ` - ${format(props.spouseDied)}` : blank);
  const displayClassName = wrapNames ? styles.inline : styles.inlineBlock;
  const leftOrRightClassName = styles[props.half] || blank;
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
