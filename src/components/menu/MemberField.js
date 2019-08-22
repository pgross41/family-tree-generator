import React from 'react';
import fieldStyles from './Field.module.css';
import styles from './MemberField.module.css';

/**
 * Represents a family member (plus their children)
 */
const MemberField = (props) => {
  const member = props.member;
  const [isHover, setHover] = React.useState(false);
  const className = `${fieldStyles.field} ${styles.memberField} ${props.root ? styles.root : ''} ${isHover ? styles.hover : ''}`
  const name = member.name + (member.spouseName ? ' and ' : '') + member.spouseName;
  const handleHover = (event, hover) => {
    event.stopPropagation();
    setHover(hover)
  };

  const collapsed = (
    <>
      <div>{name}</div>
      <>{props.member.children.map(member => (
        <MemberField member={member} key={member.id} />
      ))}</>
    </>
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

  // So much work for hover because of propagation
  return (
    <div className={className} onMouseOver={(event) => handleHover(event, true)} onMouseOut={(event) => handleHover(event, false)}>
      {expanded}
    </div >
  );
}

export default MemberField;
