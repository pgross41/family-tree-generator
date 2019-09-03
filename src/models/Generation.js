/**
 * Holds data about the members in a single depth/generation 
 */
class Generation {

    members = [];
    
    size() {
        return this.members.length;
    }

    addMember(member) {
        this.members.push(member);
        member.generationId = this.size();
    }
}

export default Generation;
