let nextId = 0;
class FamilyMember {
    constructor(props) {
        const defaultprops = {
            id: undefined, // This will always be set below 
            name: "",
            born: "",
            died: "",
            spouseName: "",
            spouseBorn: "",
            parentId: undefined,
            offsetAngle: undefined,
            noBorder: undefined,
        }
        // Don't accept anything not included in defaultProps
        const validProps = Object.keys(props)
            .filter(key => Object.keys(defaultprops).includes(key))
            .reduce((obj, key) => ({ ...obj, [key]: props[key] }), {});
        Object.assign(this, { ...defaultprops, ...validProps });
        this.props = validProps;
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

    isFirst() {
        return this.childId === 1;
    }

    isLast() {
        return this.childId === this.maxChildId;
    }

}

export default FamilyMember;