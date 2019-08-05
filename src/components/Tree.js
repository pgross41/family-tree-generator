import React from 'react';
import ChildNode from './ChildNode.js';

/**
 * The tree and the things in it
 */
const Tree = (props) => {
  const family = props.familyData.family;
  const metadata = props.familyData.metadata;
  let key = 0;

  const getChildNodes = (children) => children.reduce((all, child) => {
    all.push(<ChildNode {...child} key={key++} />);
    all.push(getChildNodes(child.children));
    return all.flat();
  }, []);

  return (
    <div className="tree">
      {getChildNodes(family.children)}
    </div>
  );
}

export default Tree;
