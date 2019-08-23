import React from 'react';
import styles from './Fields.module.css';
import Field from './Field';
import config from '../../config';
import MemberField from './MemberField';

/**
 * Popout tools fields
 */
const Fields = (props) => {
  return (
    <div className={styles.fields}>
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
        <h3>Family Members</h3>
        <MemberField member={config.members[0]} root={true} />
      </div>
    </div>
  );
}

export default Fields;
