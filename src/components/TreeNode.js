import React from 'react';

/**
 * Any item that needs to be drawn on the tree including people and images 
 */
const TreeNode = (props) => {
  const leftOrRight = props.position.half;
  const style = props.position.style;
  return (
    <div className="treeNode" style={style}>
      <div className={`content ${leftOrRight}`}>
        {props.children}
      </div>
    </div>
  );
}

export default TreeNode;
