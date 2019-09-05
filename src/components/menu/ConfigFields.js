import React from 'react';
import styles from './ConfigFields.module.css';
import Field from './ConfigField';
import MemberField from './MemberField';
import blankConfig from './../../config/blank';
import { MdSearch } from "react-icons/md";
import { Context } from "./../Context";

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
      <Field label="Title" configKey="title" attrs={{ type: "text" }} />
      <Field label="Subtitle" configKey="subTitle" attrs={{ type: "text" }} />
      <h3>Tree Settings</h3>
      <Field label="Tree Size" configKey="treeWidth" attrs={{ placeholder: 'px' }} />
      <Field label="Tree Angle" configKey="treeAngle" attrs={{ placeholder: 'degrees' }} />
      <Field label="Edge Leaf Offset" configKey="edgeLeafOffsetAngle" attrs={{ placeholder: 'degrees' }} />
      <Field label="Min Sibling Angle" configKey="minAngleBetweenSibs" attrs={{ placeholder: 'degrees' }} />
      <Field label="Date Format" configKey="dateFormat" attrs={{ type: "text", placeholder: blankConfig.dateFormat }} />
      <Field label="Squish Names Together" configKey="wrapNames" attrs={{ type: "checkbox" }} />
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
