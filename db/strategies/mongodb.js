const Icrud = require('./interface/Icrud');


class MongoDB extends Icrud {
    constructor() {
        super()
    }

    create(item) {
        console.log('Item foi salvo em mongoDB')
    }
}

module.exports = MongoDB