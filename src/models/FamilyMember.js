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

    isFirstChild() {
        return this.childId === 1;
    }

    isLastChild() {
        return this.childId === this.maxChildId;
    }

    isFirst() {
        return this.generation && this.generationId === 1;
    }

    isLast() {
        return this.generation && this.generationId === this.generation.size();
    }

}

export default FamilyMember;