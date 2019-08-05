import React from 'react';
import TreeNode from './TreeNode.js';

/**
 * An image drawn on the tree 
 */
const ImgNode = (props) => {
  return (
    <TreeNode>
      <img className="imgNode" src={`/images/${props.src}`} alt=""/>
    </TreeNode >
  );
}

export default ImgNode;
