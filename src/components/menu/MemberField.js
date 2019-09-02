import React from 'react';
import fieldStyles from './ConfigField.module.css';
import styles from './MemberField.module.css';
import { MdExpandLess, MdExpandMore } from "react-icons/md";
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
   * Elements 
   */
  const textInput = (props) => (<input ref={props.ref}
    value={member[props.configKey] || props.defaultValue || ''}
    onChange={(event) => onFieldChange(event, props.configKey)}
    onKeyDown={(event) => onFieldKeyDown(event, props.configKey)}
  />)

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
      <div>Name / Birth / Death</div>
      {textInput({ configKey: "name", ref: nameField })}
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
        <div>Child Min Sibling Angle</div>
        {textInput({ configKey: "childrenMinAngleBetweenSibs", defaultValue: "0" })}
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

  const reorderButtons = <>
    <div onClick={(event) => onClickReorder(event, 1)} className={styles.reorderButton} title="Move Down" >
      <MdExpandMore className={member.isLast() ? styles.dithered : undefined} />
    </div>
    <div onClick={(event) => onClickReorder(event, -1)} className={styles.reorderButton} title="Move Up">
      <MdExpandLess className={member.isFirst() ? styles.dithered : undefined} />
    </div>
  </>;

  return (
    <div className={className}>
      <div onClick={onClickExpand}>
        <div className={nameClassName}>{name}</div>
        {!props.root && isActive && reorderButtons}
      </div>
      {isActive ? expanded : collapsed}
    </div >
  );
});

export default MemberField;
