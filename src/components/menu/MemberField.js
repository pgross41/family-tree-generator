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

  /**
   * Helper vars
   */
  const context = React.useContext(Context);
  const member = props.member;
  const selectedMember = context.selectedMember || {};
  const isAncestorOfSelected = (selectedMember.ancestors || []).includes(member.id)
  const isActive = member.id === selectedMember.id;
  const className = `${fieldStyles.configField} ${styles.memberField} ${props.root ? styles.root : ''} ${isActive ? styles.active : ''}`
  const name = member.name + (member.spouseName ? ' and ' : '') + member.spouseName;
  const nameClassName = `${styles.name} ${isActive || isAncestorOfSelected ? styles.highlight : ''}`;
  const updateMemberField = (key, value) => {
    context.config.members.find(membr => membr.id === member.id)[key] = value;
    context.setConfig({ members: context.config.members });
  }

  /**
   * Event handlers
   */
  const onClickExpand = (event) => {
    event.stopPropagation();
    context.setSelectedMember(member.id === selectedMember.id ? member.parent || {} : member);
  }

  const onClickRemove = (event) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    const getDescendentIds = (member) => [
      ...member.children.map(child => child.id),
      ...member.children.map(child => getDescendentIds(child))
    ].flat();
    const descendents = getDescendentIds(member);
    const message = `This will also remove ${descendents.length} descendent${descendents.length > 1 ? 's' : ''}, are you absolutely sure?`;
    if (descendents.length && !window.confirm(message)) return;
    context.setConfig({ members: context.config.members.filter(membr => ![...descendents, member.id].includes(membr.id)) });
    context.setSelectedMember(member.parent || {});
  }

  const onClickAddChild = (event) => {
    context.config.members.find(membr => membr.id === member.id).children.push({key:"value"})
    console.log(context.config.members);
    context.setConfig({ members: context.config.members});
    context.setSelectedMember(member.parent || {});
  }

  const onFieldChange = (event, memberKey, value) => updateMemberField(memberKey, value === undefined ? event.target.value : value);
  const onFieldKeyDown = (event, memberKey) => updateMemberField(memberKey, handleNumberFieldArrowKey(event));

  /**
   * Elements 
   */
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
          {textInput({ configKey: "offsetAngle", defaultValue: "0" })}
        </div>
        <div className={styles.inline}>
          <div>Hide Border</div>
          <input
            type="checkbox"
            defaultChecked={member.noBorder}
            onChange={(event) => onFieldChange(event, "noBorder", event.target.checked)}>
          </input>
        </div>
        <div className={`${styles.inline} ${styles.removeButton} `}>
          <div>&nbsp;</div>
          <button onClick={onClickRemove}>Remove</button>
        </div>
      </>}
      <div>
        <div>Children</div>
        <div>
          {props.member.children.map(member => (
            <MemberField member={member} key={member.id} />
          ))}
        </div>
        <div className={styles.addChildButton}>
          <button onClick={onClickAddChild}>Add Child</button>
        </div>
      </div>
    </>
  )

  const ToggleExpandButton = isActive ? MdExpandMore : MdChevronRight;

  return (
    <div className={className}>
      <div onClick={onClickExpand} className={nameClassName}>
        {name}<ToggleExpandButton className={styles.toggleExpandButton} />
      </div>
      {isActive ? expanded : collapsed}
    </div >
  );
});

export default MemberField;
