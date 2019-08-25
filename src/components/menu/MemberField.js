import React from 'react';
import fieldStyles from './ConfigField.module.css';
import styles from './MemberField.module.css';
import { MdChevronRight, MdExpandMore } from "react-icons/md";
import Context from './../Context';
import { handleNumberFieldArrowKey } from '../../util/eventHandlers';

/**
 * Represents a family member (plus their children)
 */
const MemberField = React.memo((props) => {
  const context = React.useContext(Context);
  const member = props.member;
  const selectedMember = context.selectedMember || {};
  const isAncestorOfSelected = (selectedMember.ancestors || []).includes(member.id)
  const isActive = member.id === selectedMember.id;
  const className = `${fieldStyles.configField} ${styles.memberField} ${props.root ? styles.root : ''} ${isActive ? styles.active : ''}`
  const name = member.name + (member.spouseName ? ' and ' : '') + member.spouseName;
  const toggleExpand = (event) => {
    event.stopPropagation();
    context.setSelectedMember(member.id === selectedMember.id ? member.parent || {} : member);
  }
  const nameClassName = `${styles.name} ${isActive || isAncestorOfSelected ? styles.highlight : ''}`;

  const updateMemberField = (key, value) => {
    context.config.members.find(membr => membr.id === member.id)[key] = value;
    context.setConfig({ members: context.config.members });
  }
  const onFieldChange = (event, memberKey, value) => updateMemberField(memberKey, value === undefined ? event.target.value : value);
  const onFieldKeyDown = (event, memberKey) => updateMemberField(memberKey, handleNumberFieldArrowKey(event));
  const textInput = (props) => (<input
    value={member[props.configKey] || props.defaultValue || ''}
    onChange={(event) => onFieldChange(event, props.configKey)}
    onKeyDown={(event) => onFieldKeyDown(event, props.configKey)}
  />
  )

  const collapsed = (
    <>{isAncestorOfSelected && props.member.children.map(member => (
      <MemberField member={member} key={member.id} />
    ))}</>
  )

  const expanded = (
    <>
      <div>
        <div>Name / Birth / Death</div>
        {textInput({ configKey: "name" })}
        {textInput({ configKey: "born" })}
        {textInput({ configKey: "died" })}
      </div>
      <div>
        <div>Partner Name / Birth / Death</div>
        {textInput({ configKey: "spouseName" })}
        {textInput({ configKey: "spouseBorn" })}
        {textInput({ configKey: "spouseDied" })}
      </div>
      {!props.root && <>
        <div className={styles.inline}>
          <div>Angle Adjustment</div>
          {textInput({ configKey: "offsetAngle", defaultValue: "0"})}
        </div>
        <div className={styles.inline}>
          <div>Hide Border</div>
          <input
            type="checkbox"
            defaultChecked={member.noBorder}
            onChange={(event) => onFieldChange(event, "noBorder", event.target.checked)}>
          </input>
        </div>
      </>}
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
