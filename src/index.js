const ContextStrategy = require('../db/strategies/base/contextStrategy');
const MongoDB = require('../db/strategies/mongodb')
const Postgres = require('../db/strategies/postgres')

async function main() {
  const contextMongo = new ContextStrategy(new MongoDB());
  const createdMongoItem = await contextMongo.create({ /* Dados do item a ser criado */ });
  console.log('Item criado no MongoDB:', createdMongoItem);

  const contextPostgres = new ContextStrategy(new Postgres());
  const createdPostgresItem = await contextPostgres.create({ /* Dados do item a ser criado */ });
  console.log('Item criado no Postgres:', createdPostgresItem);

  const result = await contextMongo.read({ /* Parâmetros de leitura */ });
  console.log('Dados lidos do MongoDB:', result);
}

main().catch(error => {
  console.error("Erro:", error);
});
