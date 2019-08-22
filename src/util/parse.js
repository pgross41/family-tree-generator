/**
 * Read CSV text and convert it to a JS object with parent/child relationships
 * The "children" field is an array that is populated by matching "name" to "parentName"
 * This also adds calculated metadata fields that are needed to position nodes on the tree
 */

import Papa from 'papaparse';
const _ = require('lodash');

export default function (memberDataOrmembersCsvString) {

    // Read data
    const isCsv = typeof memberDataOrmembersCsvString == "string"
    const data = isCsv
        ? Papa.parse(memberDataOrmembersCsvString, { header: true }).data
        : memberDataOrmembersCsvString;

    // Create relationships
    const getChildren = (parent) => _.chain(data)
        .filter(row => isCsv ? parent.name === row.parentName : parent.id === row.parentId)
        .map(child => _.extend(child, { parent: parent, children: getChildren(child) }))
        .each(row => row._included = true)
        .value()
    const root = _.find(data, row => _.isEmpty(isCsv ? row.parentName : row.parentId));
    const family = _.extend(root, { children: getChildren(root), depth: 0 });

    // Check for orphans, likely due to misspelled name or parentName
    _.chain(data)
        .filter(row => row !== root & !row._included)
        .each(badRow => console.error(`${badRow.name} is not included! parent: ${isCsv ? badRow.parentName : badRow.parentId}`))
        .value();

    // Calculate metadata, nodeIDs, and remove the temp _included field
    let nodeId = 0;
    const metadata = { depthCounts: [1], depthMinThetas: [undefined] }
    const prevSiblings = []; // This does not require same parent 
    const handleChildren = (children, depth = 0) => {
        depth++;
        let childId = 0;
        _.each(children, (child) => {
            delete child._included;
            const generationId = metadata.depthCounts[depth] + 1 || 1;
            metadata.depthCounts[depth] = generationId;
            child.generationId = generationId;
            child.childId = ++childId;
            child.maxChildId = children.length;
            child.depth = depth;
            child.nodeId = isCsv ? ++nodeId : child.id;
            child.prevSibling = prevSiblings[depth];
            prevSiblings[depth] = child;
            handleChildren(child.children, depth);
        })
    };
    handleChildren(family.children);

    console.log(metadata);

    return {
        family: family,
        metadata: metadata
    };
}