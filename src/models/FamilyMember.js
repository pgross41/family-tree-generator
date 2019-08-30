import MemberData from './MemberData';

/**
 * Adds functions and calculated fields onto MemberData
 */

class FamilyMember extends MemberData {
    constructor(props = {}) {
        super(props);
        Object.assign(this, { ...props });
    }

    getDescendentIds(member = this) {
        return [
            ...member.children.map(child => child.id),
            ...member.children.map(child => this.getDescendentIds(child))
        ].flat();
    }

    isFirst() {
        return this.childId === 1;
    }

    isLast() {
        return this.childId === this.maxChildId;
    }

}

export default FamilyMember;