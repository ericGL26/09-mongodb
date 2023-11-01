const Mongoose = require('mongoose');
Mongoose.connect('mongodb://admin:senhaadmin@localhost:27017/herois?authSource=admin', { useNewUrlParser: true}).catch(error => {
  if(!error) return;
    console.log('Falha na conexão!', error)
})


const connection = Mongoose.connection

connection.once('open', () => console.log('Database rodando'))
setTimeout(() => {
    const estadoDaConexao = connection.readyState
    console.log('Estado:', estadoDaConexao)
}, 1000)


const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('Result cadastrar', resultCadastrar)

    const listIntens = await model.find()
    console.log('Items', listIntens)
}
main()

