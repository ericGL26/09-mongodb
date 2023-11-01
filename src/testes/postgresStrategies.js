const assert = require('assert');
const Postgres = require('../../db/strategies/postgres');
const Context = require('../../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: 'Batman', poder: 'Predador' };
const MOCK_HEROI_ATUALIZAR = { nome: 'Batman', poder: 'Predador' };

describe('Postgres Strategy', function () {
    this.timeout(Infinity);

    this.beforeAll(async function () {
        await context.connect();
        await context.delete();
        await context.create(MOCK_HEROI_ATUALIZAR);
    });

    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected();
        assert.equal(result, true);
    });

    //it('cadastrar', async function () {
        //const result = await context.create(MOCK_HEROI_CADASTRAR);
        //delete result.id;
        //assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    //});

    it.only('listar', async function () {
        const result = await context.read();
        console.log('Valores do banco de dados:', result);
        // Substitua MOCK_HEROI_CADASTRAR pelo valor esperado
        //const expectedValues = []; // Preencha com os valores esperados do banco de dados
        //assert.deepEqual(result, expectedValues);
    });
    

    it('Remover por id', async function () {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    });

    it('atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const novoItem = {
            nome: 'Batman atualizado',
            poder: 'Iii'
        };
        const result = await context.update(itemAtualizar.id, novoItem);
        console.log('RESULTADO', result)
        console.log([itemAtualizar])
        //assert.deepEqual(result, 1);

        // Verifique se o item foi atualizado corretamente
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
        console.log('AAAaaaaAAAA', itemAtualizado);
        assert.equal(itemAtualizado.nome, novoItem.nome);
        assert.equal(itemAtualizado.poder, novoItem.poder);
    });
});