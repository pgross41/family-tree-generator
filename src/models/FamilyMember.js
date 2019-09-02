import FamilyMemberData from './FamilyMemberData';

/**
 * Adds functions and calculated fields onto FamilyMemberData
 */

class FamilyMember extends FamilyMemberData {
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