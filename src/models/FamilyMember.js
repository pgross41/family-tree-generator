let nextId = 0;
class FamilyMember {
    constructor(values) {
        const defaultValues = {
            name: undefined,
            born: undefined,
            died: undefined,
            spouseName: undefined,
            spouseBorn: undefined,
            parentId: undefined,
            offsetAngle: undefined,
            noBorder: undefined,
            parent: undefined,
            children: [],
        }
        Object.assign(this, { ...defaultValues, ...values });
        this.id = ++nextId;
    }
}

export default FamilyMember;