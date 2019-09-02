/**
 * Holds data about the members in a single depth/generation 
 */
class Generation {

    members = [];
    
    size() {
        return this.members.length;
    }

    // Always the first member
    getMinTheta() {
        return this.members[0].calculations.theta;
    }

    addMember(member) {
        this.members.push(member);
        member.generationId = this.size();
    }
}

export default Generation;
