class NPCPerson extends Person {
    talkWith(person) {
        console.log("Hello " + person.getName() + ", my Name is " + this.getName() + ". Nice to meet you!");
    }
}