import React from 'react';
import styles from './RootNode.module.css';
import childStyles from './ChildNode.module.css';
import { formatDate } from './../../util/helpers';
import { Context } from './../Context';

/**
 * A child and their spouse on the tree
 */
const RootNode = (props) => {
  const { state } = React.useContext(Context);
  const name = (props.name || '');
  const format = (date) => formatDate(date, state.config.dateFormat);
  const date = format(props.born) + (props.died ? ` - ${format(props.died)}` : '');
  const spouseName = props.spouseName || '';
  const spouseDate = format(props.spouseBorn) + (props.spouseDied ? ` - ${format(props.spouseDied)}` : '');
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
