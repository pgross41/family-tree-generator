/**
 * Read CSV text or members config data and creates parent/child relationships
 * The "children" field is an array that is populated by matching "name" to "parentName"
 * This also adds calculated metadata fields that are needed to position nodes on the tree
 */

import Papa from 'papaparse';
import Member from './FamilyMember';
const _ = require('lodash');

class Family {

    isCsv = undefined;
    members = [];
    metadata = undefined;
    rootMember = undefined;

    constructor(memberDataOrmembersCsvString) {

        // Read data
        this.isCsv = typeof memberDataOrmembersCsvString == "string"
        const data = (
            this.isCsv
                ? Papa.parse(memberDataOrmembersCsvString, { header: true }).data
                : memberDataOrmembersCsvString
        ).map(member => new Member(member));
        
        // Create relationships
        const getChildren = (parent) => _.chain(data)
            .filter(row => this.isCsv ? parent.name === row.parentName : parent.id === row.parentId)
            .map(child => _.extend(child, { parent: parent, children: getChildren(child) }))
            .each(row => row._included = true)
            .each(row => this.members.push(row))
            .value()
        const root = _.find(data, row => _.isEmpty(this.isCsv ? row.parentName : row.parentId));
        this.rootMember = _.extend(root, { children: getChildren(root), depth: 0 });
        this.members.unshift(this.rootMember);

        // Check for orphans, likely due to misspelled name or parentName
        _.chain(data)
            .filter(row => row !== this.rootMember & !row._included)
            .each(badRow => console.error(`${badRow.name} is not included! parent: ${this.isCsv ? badRow.parentName : badRow.parentId}`))
            .value();

        // Calculate metadata, nodeIDs, and remove the temp _included field
        let nodeId = 0;
        this.metadata = { depthCounts: [1], depthMinThetas: [undefined] }
        const prevSiblings = []; // This does not require same parent 
        const handleChildren = (children, depth = 0, ancestors = [1]) => {
            depth++;
            let childId = 0;
            _.each(children, (child) => {
                delete child._included;
                const generationId = this.metadata.depthCounts[depth] + 1 || 1;
                this.metadata.depthCounts[depth] = generationId;
                child.generationId = generationId;
                child.childId = ++childId;
                child.maxChildId = children.length;
                child.depth = depth;
                child.nodeId = this.isCsv ? ++nodeId : child.id;
                child.prevSibling = prevSiblings[depth];
                child.ancestors = ancestors;
                prevSiblings[depth] = child;
                handleChildren(child.children, depth, [...ancestors, child.nodeId]);
            })
        };
        handleChildren(root.children);
    }
}

export default Family;