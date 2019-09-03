/**
 * Holds the config data needed to create a FamilyMember
 */

class FamilyMemberData {
    constructor(props = {}) {
        const defaultprops = {
            id: undefined, // This will always be set below 
            name: "New Member",
            born: "",
            died: "",
            spouseName: "",
            spouseBorn: "",
            parentId: undefined,
            offsetAngle: undefined,
            childrenMinAngleBetweenSibs: undefined,
            childEdge1Adjustment: undefined,
            childEdge2Adjustment: undefined
        }
        // Don't accept anything not included in defaultProps
        const validProps = Object.keys(props)
            .filter(key => Object.keys(defaultprops).includes(key))
            .reduce((obj, key) => ({ ...obj, [key]: props[key] }), {});
        Object.assign(this, { ...defaultprops, ...validProps });
        if (this.id) {
            FamilyMemberData.nextId = (Math.max(FamilyMemberData.nextId, this.id));
        } else {
            this.id = ++FamilyMemberData.nextId;
        }
    }
}

FamilyMemberData.nextId = 0;

export default FamilyMemberData;