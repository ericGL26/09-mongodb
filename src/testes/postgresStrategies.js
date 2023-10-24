const assert = require('assert');
const Postgres = require('../../db/strategies/postgres');
const Context = require('../../db/strategies/base/contextStrategy');

const context = new Context(new Postgres());
const MOCK_HEROI_CADASTRAR = { nome: 'Gaviao Negro', poder: 'Flechas' };
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

    it('cadastrar', async function () {
        const result = await context.create(MOCK_HEROI_CADASTRAR);
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('listar', async function () {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome });
        delete result.id;
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR);
    });

    it('Remover por id', async function () {
        const [item] = await context.read({});
        const result = await context.delete(item.id);
        assert.deepEqual(result, 1);
    });

    it.only('atualizar', async function () {
        const [itemAtualizar] = await context.read({ nome: MOCK_HEROI_ATUALIZAR.nome });
        const novoItem = {
            nome: 'Mulher Maravilha', // Não é necessário copiar todo o MOCK_HEROI_ATUALIZAR
            poder: 'Super Força'     // Apenas atualize os campos necessários
        };
        const result = await context.update(itemAtualizar.id, novoItem);
        assert.deepEqual(result, 1);

        // Verifique se o item foi atualizado corretamente
        const [itemAtualizado] = await context.read({ id: itemAtualizar.id });
        assert.equal(itemAtualizado.nome, novoItem.nome);
        assert.equal(itemAtualizado.poder, novoItem.poder);
    });
});
