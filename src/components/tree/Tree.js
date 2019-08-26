import React from 'react';
import ChildNode from './ChildNode.js';
import LeafNode from './LeafNode.js';
import RootNode from './RootNode.js';
import TreePie from './TreePie.js';
import styles from './Tree.module.css';
import Context from './../Context';

const toRad = (degrees) => degrees * (Math.PI / 180)

/**
 * The tree and the things in it
 */
const Tree = (props) => {
  const context = React.useContext(Context);
  const config = context.config;
  const rootMember = context.family.rootMember;
  const metadata = context.family.metadata;

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
    const maxDepth = metadata.depthCounts.length;
    const r = (100 / maxDepth) * child.depth;
    const singleNodeTheta = maxTheta / (metadata.depthCounts[depth] - 1);
    const childId = child.childId;
    const thetaStart = parentCalc ? parentCalc.theta : Math.PI + (Math.PI - maxTheta) / 2;
    const prevSiblingTheta = (child.prevSibling && child.prevSibling.calculations.theta) || 0;
    const theta0 = thetaStart + singleNodeTheta * (childId - (parentCalc ? config.childOffsetFactor : 1));
    const theta1 = Math.max(prevSiblingTheta + toRad(config.minAngleBetweenSibs), theta0);
    const theta = theta1 + toRad(child.offsetAngle || 0);
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

  const getGenerationLeaves = () => {
    const leafNodes = [];
    const offset = Math.PI / 50;
    const thetaStart = Math.min(...metadata.depthMinThetas.slice(1)) - offset;
    const thetaEnd = Math.PI * 2 + (Math.PI - Math.min(...metadata.depthMinThetas.slice(1))) + offset;
    let key = 0;
    let maxR = 0;
    const addRow = (depth, extraR = 0, mod = 1) => {
      const leavesInRow = Math.round(depth * 25);
      [...Array(leavesInRow)].forEach((_, idx) => {
        if (!(idx % mod)) {
          const r = ((100 / metadata.depthCounts.length) * depth) + 10 + extraR;
          maxR = r < maxR || extraR ? maxR : r;
          const theta = thetaStart + ((thetaEnd - thetaStart) / (leavesInRow - 1)) * idx;
          const style = polarToStyle(r, theta);
          leafNodes.push(<LeafNode key={++key} id={key} style={style} size="small" />);
        }
      });

    }
    Object.keys(metadata.depthCounts).forEach((depth) => addRow(depth));
    addRow(metadata.depthCounts.length - 1, 5, 2);
    addRow(metadata.depthCounts.length - 1, 8, 5);
    return {
      leafNodes: leafNodes,
      maxR: maxR
    }
  }

  const getEdgeLeaves = () => {
    const leafNodes = [];
    const offset = Math.PI / 50;
    const thetaStart = Math.min(...metadata.depthMinThetas.slice(1)) + offset;
    const thetaEnd = Math.PI * 2 + (Math.PI - Math.min(...metadata.depthMinThetas.slice(1))) - offset;
    const leftTheta = thetaStart - toRad(config.edgeLeafOffsetAngle)
    const rightTheta = thetaEnd + toRad(config.edgeLeafOffsetAngle)
    let key = 0;
    [...Array(metadata.depthCounts.length)].forEach((_, depth) => {
      // The "edge" leaves
      if (parseInt(depth) !== 0) {
        const r = ((100 / metadata.depthCounts.length) * depth) - 11
        // Left side
        leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, leftTheta)} />);
        // Right side
        leafNodes.push(<LeafNode id={++key} key={key} style={polarToStyle(r, rightTheta)} />);
      }
    });
    return {
      leafNodes: leafNodes,
      thetaStart: leftTheta
    };
  }


  const treeStyle = {
    width: config.treeWidth,
    height: `calc(${config.treeHeight} + 460px)`,
    zoom: config.zoom
  }

  const treePieStyle = {
    width: config.treeWidth,
    height: `calc(${config.treeHeight} * 2)`
  }

  const treeNodesStyle = {
    width: config.treeWidth,
    height: config.treeHeight
  }

  const childNodes = getChildNodes(rootMember.children);
  const generationLeaves = getGenerationLeaves();
  const edgeLeaves = getEdgeLeaves()

  return (
    <div className={styles.tree} style={treeStyle}>
      <TreePie style={treePieStyle} thetaStart={edgeLeaves.thetaStart} r={generationLeaves.maxR} />
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
