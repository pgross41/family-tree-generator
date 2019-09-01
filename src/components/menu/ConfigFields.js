import React from 'react';
import styles from './ConfigFields.module.css';
import Field from './ConfigField';
import MemberField from './MemberField';
import { MdSearch } from "react-icons/md";
import { Context } from './../Context';

/**
 * The fields in the menu
 */
const ConfigFields = (props) => {
  const { state, dispatch } = React.useContext(Context);
  const searchMembers = (event) => {
    const searchString = event.target.value.toLowerCase();
    dispatch(["setSelectedMember", state.family.findByName(searchString)]);
  }
  return (
    <div className={styles.configFields}>
      <h3>Labels</h3>
      <Field label="Title" configKey="title" />
      <Field label="Subtitle" configKey="subTitle" />
      <h3>Tree Math</h3>
      <Field label="Width" configKey="treeWidth" />
      <Field label="Height" configKey="treeHeight" />
      <Field label="Tree Angle" configKey="treeAngle" />
      <Field label="Edge Leaf Offset" configKey="edgeLeafOffsetAngle" />
      <Field label="Min Sibling Angle" configKey="minAngleBetweenSibs" />
      <Field label="Child Offset Factor" configKey="childOffsetFactor" />
      <h3>
        Family Members
          <div className={styles.search} >
          <input onChange={searchMembers} />
          <MdSearch className={styles.searchIcon} />
        </div>
      </h3>
      <MemberField member={state.family.rootMember} root={true} />
    </div>
  );
}

export default ConfigFields;
