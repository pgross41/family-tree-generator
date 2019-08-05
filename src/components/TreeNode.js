import React from 'react';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const TreeNode = (props) => {
  const leftOrRight = "";
  const style = {
    position: "absolute",
    width: 0,
    height: 0
  };
  return (
    <div className={`treeNode ${leftOrRight}`} style={style}>
      {props.children}
    </div>
  );
}

export default TreeNode;
