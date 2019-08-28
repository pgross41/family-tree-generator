let nextId = 0;
class FamilyMember {
    constructor(props) {
        const defaultprops = {
            name: "",
            born: "",
            died: "",
            spouseName: "",
            spouseBorn: "",
            parentId: undefined,
            offsetAngle: undefined,
            noBorder: undefined,
            parent: undefined,
            children: [],
        }
        Object.assign(this, { ...defaultprops, ...props });
        if (this.id) {
            nextId = (Math.max(nextId, this.id));
        } else {
            this.id = ++nextId;
        }
    }

    getDescendentIds(member = this) {
        return [
            ...member.children.map(child => child.id),
            ...member.children.map(child => this.getDescendentIds(child))
        ].flat();
    }

}

export default FamilyMember;