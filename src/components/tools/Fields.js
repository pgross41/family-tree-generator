import React from 'react';
import styles from './Fields.module.css';
import TextField from './TextField';
import config from '../../config';

/**
 * Popout tools fields
 */
const Fields = (props) => {
  return (
    <div className={styles.fields}>
      <div className={styles.fieldsScroll}>
        <h3>Labels</h3>
        <TextField label="Title" configKey="title" />
        <TextField label="Subtitle" configKey="subTitle" />
        <h3>Math</h3>
        <div>
          <div className={styles.inline}>
            <TextField label="Width" configKey="treeWidth" />
          </div>
          <div className={styles.inline}>
            <TextField label="Height" configKey="treeHeight" />
          </div>
        </div>
        <div>
          <div className={styles.inline}>
            <TextField label="Tree Angle" configKey="treeAngle" />
          </div>
          <div className={styles.inline}>
            <TextField label="Min Sibling Angle" configKey="minAngleBetweenSibs" />
          </div>
        </div>
        <div>
          <div className={styles.inline}>
            <TextField label="Child Offset Factor" configKey="childOffsetFactor" />
          </div>
          <div className={styles.inline}>
            <TextField label="Edge Leaf Offset" configKey="edgeLeafOffsetAngle" />
          </div>
        </div>
        <h3>Members</h3>
        {JSON.stringify(config.data)}
      </div>
    </div>
  );
}

export default Fields;
