/**
 * Holds the config data needed to create a FamilyMember
 */

class MemberData {
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
            noBorder: undefined,
        }
        // Don't accept anything not included in defaultProps
        const validProps = Object.keys(props)
            .filter(key => Object.keys(defaultprops).includes(key))
            .reduce((obj, key) => ({ ...obj, [key]: props[key] }), {});
        Object.assign(this, { ...defaultprops, ...validProps });
        if (this.id) {
            MemberData.nextId = (Math.max(MemberData.nextId, this.id));
        } else {
            this.id = ++MemberData.nextId;
        }
    }
}

MemberData.nextId = 0;

export default MemberData;