import React from 'react';
import ChildNode from './ChildNode.js';
import RootNode from './RootNode.js';
import config from '../config.js';
import styles from './Tree.module.css';
import ImgNode from './ImgNode.js';
import leaves1 from '../images/leaves1.png';
import leaves2 from '../images/leaves2.png';
import leaves3 from '../images/leaves3.png';

const leaves = [leaves1, leaves2, leaves3];

/**
 * The tree and the things in it
 */
const Tree = (props) => {
  const family = props.familyData.family;
  const metadata = props.familyData.metadata;
  let key = 0;

  // Traverse the tree
  const getTreeNodes = (children) => children.reduce((all, child) => {
    child.calculations = calculate(child);
    const style = polarToStyle(child.calculations.r, child.calculations.theta);
    all.push(<ChildNode {...child} half={child.calculations.half} style={style} key={key++} />);
    if (child.childId === 1 && config.noBorders[child.name] !== "top") {
      all.push(<ImgNode style={style} src={leaves[key % 3]} styleKey={'leavesTop'} key={key++} />);
    }
    if (child.childId === child.maxChildId && config.noBorders[child.name] !== "bottom") {
      all.push(<ImgNode style={style} src={leaves[key % 3]} styleKey={'leavesBottom'} key={key++} />);
    }
    all.push(getTreeNodes(child.children));
    return all.flat();
  }, []);

  // Calculations about a child relative to the others
  const calculate = (child) => {
    const parentCalc = child.parent.calculations;
    const parentSibCount = child.parent.parent && child.parent.parent.children.length;
    const maxTheta = parentCalc ? parentCalc.singleNodeTheta * parentSibCount : config.maxAngle;
    const depth = child.depth;
    const maxDepth = metadata.depthCounts.length;
    const r = (100 / maxDepth) * child.depth;
    const singleNodeTheta = maxTheta / (metadata.depthCounts[depth] - 1);
    const childId = child.childId;
    const thetaStart = parentCalc ? parentCalc.theta : Math.PI + (Math.PI - maxTheta) / 2;
    const prevSiblingTheta = (child.prevSibling && child.prevSibling.calculations.theta) || 0;
    const theta0 = thetaStart + singleNodeTheta * (childId - (parentCalc ? config.bonusParentFactor : 1));
    const theta1 = Math.max(prevSiblingTheta + config.minThetaBetweenSibs, theta0);
    const theta = theta1 + (config.adjustments[child.name] || 0);
    const isRightHalf = theta > (Math.PI + (Math.PI / 2));
    if (child.generationId === 1) {
      metadata.depthMinThetas[depth] = theta;
    }
    return {
      half: isRightHalf ? 'right' : 'left',
      singleNodeTheta: singleNodeTheta,
      theta: theta,
      r: r
    }
  }

  const polarToStyle = (r, theta) => {
    const x = (r * Math.cos(theta)) / 2 + 50; // Half because it goes left AND right
    const y = (r * Math.sin(theta)) + 100; // Not half because it only goes up
    return {
      left: `${x}%`,
      top: `${y}%`,
      transform: `rotate(${theta}rad)`
    }
  }

  const nodesStyle = {
    width: config.treeWidth,
    height: config.treeHeight
  }

  const treeStyle = Object.assign({}, nodesStyle);
  treeStyle.height = `calc(${treeStyle.height} + 460px)`

  return (
    <div className={styles.tree} style={treeStyle}>
      <div className={styles.treeNodes} style={nodesStyle}>
        <RootNode {...family} />
        {getTreeNodes(family.children)}
      </div>
    </div>
  );
}

export default Tree;
