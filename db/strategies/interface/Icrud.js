class NotImplementedException extends Error {
    constructor() {
        super("Not implemented exception");
    }    
}

class Icrud {
    create(item) {
        throw new NotImplementedException()
    }
    read(query){
        throw new NotImplementedException()
    }
    update(id, item){
        throw new NotImplementedException()
    }
    delete(id) {
        throw new NotImplementedException()
    }
    isConected() {
        throw new NotImplementedException()
    }
}

module.exports = Icrud