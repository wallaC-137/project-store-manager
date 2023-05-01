const sinon = require('sinon');
const { expect } = require('chai');

const { salesModels } = require('../../../src/models');
const connection = require('../../../src/models/connection');
const { allSales, findSale } = require('./mocks/salesModels.mock');

describe('testa a camada model', function () {
  describe('teste rota /sales', function () {
    afterEach(function () {
      sinon.restore();
    });

    it('testa se a função "findAll" retorna todas as vendas', async function () {
      sinon.stub(connection, 'execute').resolves([allSales]);
      const result = await salesModels.findAll();
      expect(result).to.be.equal(allSales);
    });

    it('testa se a função "findAll" retorna um array com 3 itens', async function () {
      sinon.stub(connection, "execute").resolves([allSales]);
      const result = await salesModels.findAll();
      expect(result).to.be.an('array');
      expect(result).to.length(3)
    });
  })

  describe('teste rota /sales/:id', function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('testa se a função "findById" retorna um item pelo ID', async function () {
      sinon.stub(connection, "execute").resolves([[findSale]]);
      const result = await salesModels.findById(2);
      expect(result).to.be.deep.equal([findSale]);
    });

    it('testa se o retorno da função "findById" um array', async function () {
      sinon.stub(connection, "execute").resolves([[findSale]]);
      const result = await salesModels.findById();
      expect(result).to.be.an("array");
    });
  })
})