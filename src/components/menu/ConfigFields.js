import React from 'react';
import styles from './ConfigFields.module.css';
import Field from './ConfigField';
import MemberField from './MemberField';
import { MdSearch } from "react-icons/md";
import Context from './../Context';

/**
 * The fields in the menu
 */
const ConfigFields = (props) => {
  const context = React.useContext(Context);
  const searchMembers = (event) => {
    const searchString = event.target.value.toLowerCase();
    context.setSelectedMember(searchString && context.config.members.find((member) =>
      member.name.toLowerCase().includes(searchString) || member.spouseName.toLowerCase().includes(searchString)
    ));
  }
  return (
    <div className={styles.configFields}>
      <div className={styles.fieldsScroll}>
        <h3>Labels</h3>
        <Field label="Title" configKey="title" />
        <Field label="Subtitle" configKey="subTitle" />
        <h3>Tree Math</h3>
        <Field label="Width" configKey="treeWidth" />
        <Field label="Height" configKey="treeHeight" />
        <Field label="Tree Angle" configKey="treeAngle" />
        <Field label="Min Sibling Angle" configKey="minAngleBetweenSibs" />
        <Field label="Child Offset Factor" configKey="childOffsetFactor" />
        <Field label="Edge Leaf Offset" configKey="edgeLeafOffsetAngle" />
        <h3>
          Family Members
          <div className={styles.search} >
            <input onChange={searchMembers} />
            <MdSearch className={styles.searchIcon} />
          </div>
        </h3>
        <MemberField member={context.config.members[0]} root={true} />
      </div>
    </div>
  );
}

export default ConfigFields;
