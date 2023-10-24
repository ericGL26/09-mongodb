const Sequelize = require('sequelize')
const driver = new Sequelize(
    'heroes',
    'ericgomes',
    '12345',
    {
        host: 'localhost',
        dialect: 'postgres',
        quoteIdentifiers: false,
    }
) 

async function main() {
    const herois = driver.define('herois', {
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
    await herois.sync()
    await herois.create({
        nome: 'Lanterna preto',
        poder: 'Anel',
    })
    const result = await herois.findAll({ raw: true, attributes: ['nome']})
    console.log('resultado', result)
}
main()