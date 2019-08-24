import React from 'react';
import fieldStyles from './Field.module.css';
import styles from './MemberField.module.css';
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import Context from './../Context';

/**
 * Represents a family member (plus their children)
 */
const MemberField = React.memo((props) => {
  const context = React.useContext(Context);
  const member = props.member;
  const selectedMember = context.selectedMember || {};
  const isAncestorOfSelected = (selectedMember.ancestors || []).includes(member.id)
  const isActive = member.id === selectedMember.id;
  const className = `${fieldStyles.field} ${styles.memberField} ${props.root ? styles.root : ''} ${isActive ? styles.active : ''}`
  const name = member.name + (member.spouseName ? ' and ' : '') + member.spouseName;
  const toggleExpand = (event) => {
    event.stopPropagation();
    context.setSelectedMember(member.id === selectedMember.id ? member.parent || {} : member);
  }
  const nameClassName = `${styles.name} ${isActive || isAncestorOfSelected ? styles.highlight : ''}`;

  const collapsed = (
    <>{isAncestorOfSelected && props.member.children.map(member => (
      <MemberField member={member} key={member.id} />
    ))}</>
  )

  const expanded = (
    <>
      <div>
        <div>Name / Birth / Death</div>
        <input defaultValue={member.name}></input>
        <input defaultValue={member.born}></input>
        <input defaultValue={member.died}></input>
      </div>
      <div>
        <div>Partner Name / Birth / Death</div>
        <input defaultValue={member.spouseName}></input>
        <input defaultValue={member.spouseBorn}></input>
        <input defaultValue={member.spouseDied}></input>
      </div>
      <div className={styles.inline}>
        <div>Angle Adjustment</div>
        <input defaultValue={member.offsetAngle}></input>
      </div>
      <div className={styles.inline}>
        <div>Hide Border</div>
        <input type="checkbox" defaultChecked={member.noBorder}></input>
      </div>
      <div>
        <div>{props.member.children.length ? "Children" : <button>Add Child</button>} </div>
        <div>
          {props.member.children.map(member => (
            <MemberField member={member} key={member.id} />
          ))}
        </div>
      </div>
    </>
  )

  const ToggleExpandButton = isActive ? MdExpandMore : MdChevronRight;

  // So much work for hover because of propagation
  return (
    <div className={className}>
      <div onClick={toggleExpand} className={nameClassName}>
        {name}<ToggleExpandButton className={styles.toggleExpandButton} />
      </div>
      {isActive ? expanded : collapsed}
    </div >
  );
});

export default MemberField;
