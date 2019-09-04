import React from 'react';
import ChildNode from './ChildNode.js';
import LeafNode from './LeafNode.js';
import RootNode from './RootNode.js';
import TreePie from './TreePie.js';
import styles from './Tree.module.css';
import { Context } from './../Context';

const toRad = (degrees) => (degrees || 0) * (Math.PI / 180)

/**
 * The tree and the things in it
 */
const Tree = (props) => {
  const { state } = React.useContext(Context);
  const config = state.config;
  const family = state.family;
  const rootMember = family.rootMember;
  const treeThetaStart = Math.PI + (Math.PI - toRad(config.treeAngle)) / 2;
  const treeThetaEnd = Math.PI * 2 - ((Math.PI - toRad(config.treeAngle)) / 2);
  const getR = (depth) => (100 / (family.getGenerationCount() + 1)) * depth;

  // Traverse the family tree and apend to the DOM's tree
  let key = 0;
  const getChildNodes = (children) => children.reduce((all, child) => {
    child.calculations = getChildNodeCalculations(child);
    const style = polarToStyle(child.calculations.r, child.calculations.theta);
    all.push(<ChildNode {...child}
      half={child.calculations.half}
      style={style}
      key={key++}
    />);
    all.push(getChildNodes(child.children));
    return all.flat();
  }, []);

  // Calculations about a child relative to the others
  const getChildNodeCalculations = (child) => {
    const parentCalc = child.parent.calculations;
    const parentSibCount = child.parent.parent && child.parent.parent.children.length;
    const familyThetaLen = parentCalc ? parentCalc.familyThetaLen / parentSibCount : toRad(config.treeAngle);
    const childThetaLen = familyThetaLen / (child.siblings.length + 1);
    const prevSiblingTheta = (child.prevSibling && child.prevSibling.calculations.theta) || 0;
    const thetaStart = parentCalc ? parentCalc.theta - familyThetaLen / 2 : treeThetaStart;
    const thetaAdjusted = Math.max(
      thetaStart + childThetaLen * (child.childId - 0.5), // Where it "should" be
      prevSiblingTheta + toRad(config.minAngleBetweenSibs), // With global minimum 
      prevSiblingTheta + toRad(child.parent.childrenMinAngleBetweenSibs) // With sibling-level minimum
    ) + toRad(child.offsetAngle);
    const r = getR(child.depth);
    const isRightHalf = thetaAdjusted > (Math.PI + (Math.PI / 2));
    return {
      theta: thetaAdjusted,
      r: r,
      half: isRightHalf ? 'right' : 'left',
      familyThetaLen: familyThetaLen,
      childThetaLen: childThetaLen,
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

  const getGenerationLeaves = () => {
    const leafNodes = [];
    let key = 0;
    let maxR = 0;
    const addRow = (depth, extraR = 0, mod = 1) => {
      const leavesInRow = Math.round(depth * 25);
      [...Array(leavesInRow)].forEach((_, idx) => {
        if (!(idx % mod)) {
          const r = getR(depth) + 10 + extraR;
          maxR = r < maxR || extraR ? maxR : r;
          const theta = treeThetaStart + ((treeThetaEnd - treeThetaStart) / (leavesInRow - 1)) * idx;
          const style = polarToStyle(r, theta);
          leafNodes.push(<LeafNode key={++key} id={key} style={style} size="small" />);
        }
      });

    }
    // The regular "rings"
    Object.keys(family.generations).forEach((depth) => addRow(depth));
    // Fatten up the outer "ring"
    addRow(family.getGenerationCount(), 5, 2);
    addRow(family.getGenerationCount(), 8, 5);
    return {
      leafNodes: leafNodes,
      maxR: maxR
    }
  }

  const getEdgeLeaves = () => {
    const leafNodes = [];
    let key = 0;
    // Edge of a set of siblings
    family.members.forEach(member => {
      if (!member.children.length || !member.parent) return;
      const r = getR(member.depth + 1) - 11;
      const firstChildCalc = member.children[0].calculations;
      const leftTheta = firstChildCalc.theta - firstChildCalc.childThetaLen / 2 + toRad(member.childEdge1Adjustment);
      const lastChildCalc = member.children.slice(-1)[0].calculations;
      const rightTheta = lastChildCalc.theta + lastChildCalc.childThetaLen / 2 + toRad(member.childEdge2Adjustment);
      if (!member.isFirst() && !(member.prevSibling && member.prevSibling.children.length))
        leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, leftTheta)} classKey="thin" />);
      if (!member.isLast())
        leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, rightTheta)} classKey="thin" />);

    });
    // Edge of the tree
    const leftTheta = treeThetaStart - toRad(config.edgeLeafOffsetAngle)
    const rightTheta = treeThetaEnd + toRad(config.edgeLeafOffsetAngle)
    Object.keys(family.generations).forEach(depth => {
      const r = getR(depth) - 11
      leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, leftTheta)} />);
      leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, rightTheta)} />);
    });
    return leafNodes;
  }

  const treeWidth = `${config.treeWidth}px`;
  const treeHeight = `${config.treeHeight}px`;

  const treeStyle = {
    width: treeWidth,
    height: `calc(${treeHeight} + 460px)`,
  }

  const treePieStyle = {
    width: treeWidth,
    height: `calc(${treeHeight} * 2)`
  }

  const treeNodesStyle = {
    width: treeWidth,
    height: treeHeight
  }

  const childNodes = getChildNodes(rootMember.children);
  const generationLeaves = getGenerationLeaves();
  const edgeLeaves = getEdgeLeaves();

  return (
    <div className={styles.tree} style={treeStyle}>
      {family.getGenerationCount() > 1 && <TreePie style={treePieStyle} thetaStart={treeThetaStart} r={generationLeaves.maxR} />}
      <div className={styles.treeNodes} style={treeNodesStyle}>
        <RootNode {...rootMember} />
        {childNodes}
        {generationLeaves.leafNodes}
        {edgeLeaves}
      </div>
    </div>
  );
}

export default Tree;
