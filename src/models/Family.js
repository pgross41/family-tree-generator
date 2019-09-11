/**
 * Read CSV text or members config data and creates parent/child relationships
 * The "children" field is an array that is populated by matching "name" to "parentName"
 * This also calculates metadata for each generation 
 */

import Papa from 'papaparse';
import Member from './FamilyMember';
import MemberData from './FamilyMemberData';
import Generation from './Generation';

/**
 * Represents a collection of families. 
 * All changes should be made to memberData then passed to load. This will create 
 * a new members array which has additional relationships and calculated fields. 
 */
class Family {

    constructor(props) {
        const defaultprops = {
            members: [],
            memberData: [],
            generations: {},
            rootMember: undefined,
        }
        Object.assign(this, { ...defaultprops, ...props });
    }

    /**
     * Populate members with memberData array 
     */
    load(memberData) {

        // Hold a copy of the original data
        MemberData.nextId = 0;
        this.memberData = [...memberData].map(data => new MemberData(data));

        // FamilyMember objects
        this.members = [];
        this.generations = {};

        // Create relationships
        const getChildren = (parent) => this.memberData
            .filter(row => parent.id && parent.id === row.parentId)
            .map(child => {
                const member = new Member(child);
                member.parent = parent;
                member.children = getChildren(member);
                member._included = true;
                this.members.push(member);
                return member;
            })
        const rootData = Family.findRoot(this.memberData);
        this.rootMember = new Member(rootData[0]);
        this.rootMember.children = getChildren(this.rootMember)
        this.rootMember.depth = 0;
        this.members.push(this.rootMember);

        // Check for orphans, likely due to misspelled name or parentName in CSV
        this.members
            .filter(row => row !== this.rootMember & !row._included)
            .forEach(badRow => console.error(`${badRow.name} is not included! parent: ${badRow.parentId}`))

        // Calculate metadata, nodeIDs, and remove the temp _included field
        let nodeId = 0;
        const prevSiblings = []; // These are generational siblings, it does not require same parent 
        const handleChildren = (children, depth = 0, ancestors = [1]) => {
            depth++;
            let childId = 0;
            children.forEach(child => {
                delete child._included;
                child.generation = this.generations[depth] = this.generations[depth] || new Generation();
                child.generation.addMember(child);
                child.childId = ++childId;
                child.maxChildId = children.length;
                child.depth = depth;
                child.nodeId = this.isCsv ? ++nodeId : child.id;
                child.siblings = children.filter(sibling => sibling.id !== child.id);
                child.prevSibling = prevSiblings[depth];
                child.ancestors = ancestors;
                child.nextSibling = undefined;
                (prevSiblings[depth] || {}).nextSibling = child;
                prevSiblings[depth] = child;
                handleChildren(child.children, depth, [...ancestors, child.nodeId]);
            })
        };
        handleChildren(this.rootMember.children);
        return this;
    }

    get(id) {
        return this.members.find((member) => member.id === id)
    }

    getNewest() {
        const maxMemberId = this.members.reduce((max, member) => Math.max(max, member.id), Number.NEGATIVE_INFINITY);
        return this.get(maxMemberId);
    }

    getGenerationCount() {
        return Object.keys(this.generations).length
    }

    findByName(name) {
        return name && this.members.find((member) =>
            member.name.toLowerCase().includes(name) || member.spouseName.toLowerCase().includes(name)
        )
    }

    addChild(parentId, props) {
        if (this.get(parentId)) {
            this.load([...this.memberData, { ...props, parentId: parentId, name: "New Member" }]);
            // return this.get(parentId).children;
        }
    }

    addMember(memberData) {
        return this.load([...this.memberData, memberData]);
    }

    removeMember(memberId) {
        const member = this.get(memberId);
        const memberAndDescendants = [memberId, ...member.getDescendentIds()]
        return this.load(this.memberData.filter(member => !memberAndDescendants.includes(member.id)));
    }

    updateMember(memberId, memberData) {
        const member = this.memberData.find(member => member.id === memberId);
        Object.assign(member, memberData);
        return this.load(this.memberData);
    }

    moveMember(memberId, positionOffset) {
        const fromMember = this.get(memberId);
        const fromPosition = this.memberData.findIndex(member => member.id === memberId);
        const toMember = fromMember.siblings.find(member => member.childId === fromMember.childId + positionOffset);
        if (!toMember) return this;
        const toPosition = this.memberData.findIndex(member => member.id === toMember.id);
        this.memberData.splice(toPosition, 0, this.memberData.splice(fromPosition, 1)[0]);
        return this.load(this.memberData);
    }
}

/**
 * Determine which node(s) are a root node
 */
Family.findRoot = (memberData) => {
    return memberData.filter(row => !row.parentId);
}

/**
 * Read member data from comma or tab delimited text
 */
Family.parseCsv = (csvString) => {
    const data = Papa.parse(csvString, { header: true }).data;
    // todo: convert parentName to parentId
    Family.validate(data);
    return data;
}

/**
 * Validate input data can be loaded
 */
Family.validate = (memberData) => {
    if (!Array.isArray(memberData)) throw Error('Not a list');
    const rootData = Family.findRoot(memberData);
    if (!rootData.length) throw Error("No roots found (members with no parent)");
    if (rootData.length > 1) throw Error("Multiple roots found (members with no parent)");
}

export default Family;
