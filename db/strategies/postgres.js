const Icrud = require('./interface/Icrud');
const Sequelize = require('sequelize')

class Postgres extends Icrud {
    constructor() {
        super()
        this._driver = null
        this._herois = null
    }
    async isConected() {
        try{
            await this._driver.authenticate()
            return true
        }
        catch(error){
            console.error('Deu ruim tente novamente: ', error)
            return false
        }
    }
   async defineModel() {
        this._herois = this._driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        }, {
            tableName: 'TB_HEROIS',
            freezeTableName: false,
            timestamps: false
        })
        await this._herois.sync()
    }
    async create(item) {
        const {dataValues} = await this._herois.create(item)
        return dataValues
    }

    async update(id, item){
        const resultado = await  this._herois.update(item, {where: {id : id}})
    }

    async delete(id){
        const query = id ? { id } : {} 
        return this._herois.destroy({where: query})
    }

    async read(item = {}){
        return this._herois.findAll({where: item, raw: true})
    }

    async connect() {
         this._driver = new Sequelize(
            'heroes',
            'ericgomes',
            '12345',
            {
                host: 'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
            }
        )
        await this.defineModel()
    }

}

module.exports = Postgres
