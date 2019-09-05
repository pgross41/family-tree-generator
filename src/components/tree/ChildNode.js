import React from 'react';
import TreeNode from './TreeNode.js';
import styles from './ChildNode.module.css';
import cn from 'classnames';
import { formatDate } from './../../util/helpers';
import { Context } from './../Context';

/**
 * A child and their spouse on the tree
 */
const ChildNode = React.memo((props) => {
  const { state, dispatch } = React.useContext(Context);
  const ref = React.useRef();
  const wrapNames = state.config.wrapNames;
  const blank = wrapNames ? '' : '\u00A0';
  const showPlusSign = props.spouseName && !wrapNames;
  const name = (props.name || blank) + (showPlusSign ? ' +' : blank);
  const format = (date) => formatDate(date, state.config.dateFormat);
  const date = format(props.born) + (props.died ? ` - ${format(props.died)}` : blank);
  const spouseName = props.spouseName || blank;
  const spouseDate = format(props.spouseBorn) + (props.spouseDied ? ` - ${format(props.spouseDied)}` : blank);
  const displayClassName = wrapNames ? styles.inline : styles.inlineBlock;
  const leftOrRightClassName = styles[props.half] || blank;
  const selectedMemberId = (state.selectedMember || {}).id;
  if (!state.memberEls[props.child.id]) {
    dispatch(["setMemberEl", { [props.child.id]: ref.current }])
  }
  return (
    <TreeNode ref={ref} style={props.style} className={styles.childNode}>
      <div className={cn(leftOrRightClassName, props.id === selectedMemberId && styles.highlight)}>
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
});

export default ChildNode;
