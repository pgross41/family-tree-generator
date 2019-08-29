import React from 'react';
import cn from 'classnames';
import panelStyles from './Panel.module.css';
import styles from './ViewButton.module.css';
import { toTitleCase } from './../../util/helpers';

/**
 * View buttons in the panel  
 */
const ViewButton = (props) => {
  const viewButtonClassName = cn(panelStyles.panelButton, styles.viewButton);
  const view = props.view;
  const ButtonIcon = () => props.buttonIcon
  return (
    <div className={viewButtonClassName} onClick={() => props.setView(view)} title={toTitleCase(props.view)} >
      <ButtonIcon />
    </div >
  );
}

export default ViewButton;
