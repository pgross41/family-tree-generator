import React from 'react';
import ChildNode from './ChildNode.js';
import LeafNode from './LeafNode.js';
import RootNode from './RootNode.js';
import TreePie from './TreePie.js';
import styles from './Tree.module.css';
import { Context } from './../Context';

const toRad = (degrees) => degrees * (Math.PI / 180)

/**
 * The tree and the things in it
 */
const Tree = (props) => {
  const { state } = React.useContext(Context);
  const config = state.config;
  const family = state.family;
  const rootMember = family.rootMember;

  // Traverse the family tree and apend to the DOM's tree
  let key = 0;
  const getChildNodes = (children) => children.reduce((all, child) => {
    child.calculations = getChildNodePosition(child);
    const style = polarToStyle(child.calculations.r, child.calculations.theta);
    all.push(<ChildNode {...child}
      half={child.calculations.half}
      style={style}
      key={key++}
      hasTopBorder={child.childId === 1 && !child.noBorder}
      hasBottomBorder={child.childId === child.maxChildId && !child.noBorder}
    />);
    all.push(getChildNodes(child.children));
    return all.flat();
  }, []);

  // Calculations about a child relative to the others
  const getChildNodePosition = (child) => {
    const parentCalc = child.parent.calculations;
    const parentSibCount = child.parent.parent && child.parent.parent.children.length;
    const maxTheta = parentCalc ? parentCalc.singleNodeTheta * parentSibCount : toRad(config.treeAngle);
    const depth = child.depth;
    const maxDepth = family.getGenerationCount() + 1;
    const r = (100 / maxDepth) * child.depth;
    const singleNodeTheta = maxTheta / Math.max(1, (child.generation.size() - 1));
    const childId = child.childId;
    const thetaStart = parentCalc ? parentCalc.theta : Math.PI + (Math.PI - maxTheta) / 2;
    const prevSiblingTheta = (child.prevSibling && child.prevSibling.calculations.theta) || 0;
    const offset = (childId - 1 - (parentCalc ? config.childOffsetFactor : 0));
    const theta0 = thetaStart + singleNodeTheta * offset;
    const theta1 = Math.max(prevSiblingTheta + toRad(config.minAngleBetweenSibs), theta0);
    const theta = theta1 + toRad(child.offsetAngle || 0);
    const isRightHalf = theta > (Math.PI + (Math.PI / 2));
    if (depth === 1) {
      console.log(child, singleNodeTheta, theta)
    }
    console.log(r, theta);
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

  const getGenerationLeaves = () => {
    const leafNodes = [];
    const offset = Math.PI / 50;
    const thetaStart = family.getMinTheta() - offset;
    const thetaEnd = Math.PI * 2 + (Math.PI - family.getMinTheta()) + offset;
    let key = 0;
    let maxR = 0;
    const addRow = (depth, extraR = 0, mod = 1) => {
      const leavesInRow = Math.round(depth * 25);
      [...Array(leavesInRow)].forEach((_, idx) => {
        if (!(idx % mod)) {
          const r = ((100 / (family.getGenerationCount() + 1)) * depth) + 10 + extraR;
          maxR = r < maxR || extraR ? maxR : r;
          const theta = thetaStart + ((thetaEnd - thetaStart) / (leavesInRow - 1)) * idx;
          const style = polarToStyle(r, theta);
          leafNodes.push(<LeafNode key={++key} id={key} style={style} size="small" />);
        }
      });

    }
    // The regular "ring"
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
    const offset = Math.PI / 50;
    const thetaStart = family.getMinTheta() + offset;
    const thetaEnd = Math.PI * 2 + (Math.PI - family.getMinTheta()) - offset;
    const leftTheta = thetaStart - toRad(config.edgeLeafOffsetAngle)
    const rightTheta = thetaEnd + toRad(config.edgeLeafOffsetAngle)
    let key = 0;
    Object.keys(family.generations).forEach(depth => {
      // The "edge" leaves
      const r = ((100 / (family.getGenerationCount() + 1)) * depth) - 11
      // Left side
      leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, leftTheta)} />);
      // Right side
      leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, rightTheta)} />);
    });
    return {
      leafNodes: leafNodes,
      thetaStart: leftTheta
    };
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
  const edgeLeaves = getEdgeLeaves()

  return (
    <div className={styles.tree} style={treeStyle}>
      {family.getGenerationCount() > 1 && <TreePie style={treePieStyle} thetaStart={edgeLeaves.thetaStart} r={generationLeaves.maxR} />}
      <div className={styles.treeNodes} style={treeNodesStyle}>
        <RootNode {...rootMember} />
        {childNodes}
        {generationLeaves.leafNodes}
        {edgeLeaves.leafNodes}
      </div>
    </div>
  );
}

export default Tree;
