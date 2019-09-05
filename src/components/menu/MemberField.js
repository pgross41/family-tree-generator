import React from 'react';
import fieldStyles from './ConfigField.module.css';
import styles from './MemberField.module.css';
import { MdExpandLess, MdExpandMore, MdDeleteForever } from "react-icons/md";
import { Context } from './../Context';
import { handleNumberFieldArrowKey } from '../../util/helpers';

/**
 * Represents a family member (plus their children)
 */
const MemberField = React.memo((props) => {

  /**
   * Helper vars
   */
  const { state, dispatch } = React.useContext(Context);
  const member = props.member;
  const selectedMember = state.selectedMember || {};
  const isAncestorOfSelected = (selectedMember.ancestors || []).includes(member.id)
  const isActive = member.id === selectedMember.id;
  const className = `${fieldStyles.configField} ${styles.memberField} ${props.root ? styles.root : ''} ${isActive ? styles.active : ''}`
  const name = member.name + (member.spouseName ? ' and ' : '') + member.spouseName;
  const nameClassName = `${styles.name} ${isActive || isAncestorOfSelected ? styles.highlight : ''}`;
  const updateMember = (props) => dispatch(["updateMember", { id: member.id, props }]);
  const nameField = React.useRef()
  const setSelectedMember = (member) => dispatch(["setSelectedMember", member || {}]);
  // React.useEffect(() => nameField.current ? nameField.current.focus() : undefined, []);


  /**
   * Event handlers
   */
  const onClickExpand = (event) => {
    event.stopPropagation();
    setSelectedMember(member.id === selectedMember.id ? member.parent : member);
  }

  const onClickReorder = (event, positionOffset) => {
    event.stopPropagation();
    dispatch(["moveMember", { id: member.id, positionOffset: positionOffset }]);
  }

  const onClickRemove = (event) => {
    if (!window.confirm(`Are you sure you want to remove ${name}?`)) return;
    const descendents = member.getDescendentIds();
    const message = `This will also remove ${descendents.length} descendent${descendents.length > 1 ? 's' : ''}, are you absolutely sure?`;
    if (descendents.length && !window.confirm(message)) return;
    dispatch(["removeMember", member.id]);
    setSelectedMember(member.parent);
  }

  const onClickAddChild = (event) => {
    dispatch(["addMember", { parentId: member.id }]);
    // Sloppy but effective 
    setTimeout(() => setSelectedMember(state.family.getNewest()));
  }
  const onFieldChange = (event, key, value) => updateMember({ [key]: value === undefined ? event.target.value : value })
  const onFieldKeyDown = (event, key) => updateMember({ [key]: handleNumberFieldArrowKey(event) });

  /**
   * Elements - Using functions instead of react components because they don't re-render on change 
   */
  const textInput = (props) => (
    <input ref={props.ref}
      value={member[props.configKey] || props.defaultValue || ''}
      onChange={(event) => onFieldChange(event, props.configKey)}
      onKeyDown={(event) => onFieldKeyDown(event, props.configKey)}
    />
  );

  const inlineField = (props) => (
    <div className={props.className || styles.inline3}>
      <div className={styles.title}>{props.title}</div>
      {props.children}
    </div>
  );

  const addChildButton = (
    <div className={styles.addChildButton}>
      <button onClick={onClickAddChild}>Add Child</button>
    </div>
  );

  const childrenFields = <>
    {props.member.children.map(member => (
      <MemberField member={member} key={member.id} />
    ))}
    {!props.member.children.length && <div className={styles.dithered}>No children</div>}
  </>;

  const collapsed = <>
    {isAncestorOfSelected && <>
      {addChildButton}
      {childrenFields}
    </>}
  </>;

  const expanded = <>
    <div>
      {inlineField({
        title: "Name",
        children: textInput({ configKey: "name", ref: nameField })
      })}
      {inlineField({
        title: "Birth",
        children: textInput({ configKey: "born" })
      })}
      {inlineField({
        title: "Death",
        children: textInput({ configKey: "died" })
      })}
    </div>
    <div>
      {inlineField({
        title: "Partner Name",
        children: textInput({ configKey: "spouseName" })
      })}
      {inlineField({
        title: "Partner Birth",
        children: textInput({ configKey: "spouseBorn" })
      })}
      {inlineField({
        title: "Partner Death",
        children: textInput({ configKey: "spouseDied" })
      })}
    </div>
    {!props.root && <>
      {inlineField({
        title: "Member Adjustment",
        children: textInput({ configKey: "offsetAngle", defaultValue: "0" }),
        className: styles.inline4
      })}
      {inlineField({
        title: "Child Min Sibling Angle",
        children: textInput({ configKey: "childrenMinAngleBetweenSibs", defaultValue: "0" }),
        className: styles.inline4
      })}
      {inlineField({
        title: "Child Edge 1 Adjustment",
        children: textInput({ configKey: "childEdge1Adjustment", defaultValue: "0" }),
        className: styles.inline4
      })}
      {inlineField({
        title: "Child Edge 2 Adjustment",
        children: textInput({ configKey: "childEdge2Adjustment", defaultValue: "0" }),
        className: styles.inline4
      })}
    </>}
    <div>
      <div>
        <div className={styles.childrenLabel}>
          Children
        </div>
        {addChildButton}
      </div>
      <div>
        {childrenFields}
      </div>
    </div>
  </>;

  const memberButtons = <>
    <div className={styles.memberButton}>
      <MdDeleteForever className={styles.removeButton} onClick={onClickRemove} title="Remove" />
    </div>
    <div onClick={(event) => onClickReorder(event, 1)} className={styles.memberButton} title="Move Down" >
      <MdExpandMore className={member.isLastChild() ? styles.dithered : undefined} />
    </div>
    <div onClick={(event) => onClickReorder(event, -1)} className={styles.memberButton} title="Move Up">
      <MdExpandLess className={member.isFirstChild() ? styles.dithered : undefined} />
    </div>
  </>;

  return (
    <div className={className}>
      <div onClick={onClickExpand}>
        <div className={nameClassName}>{name}</div>
        {!props.root && isActive && memberButtons}
      </div>
      {isActive ? expanded : collapsed}
    </div >
  );
});

export default MemberField;
