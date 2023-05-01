const sinon = require("sinon");
const { expect } = require("chai");

const { salesServices } = require("../../../src/services");
const { salesModels } = require("../../../src/models");
const { allSales, findSale } = require("./mocks/salesServices.mock");

describe("testa a camada service", function () {
  afterEach(function () {
    sinon.restore();
  });
  describe("teste rota /sales", function () {
    beforeEach(function () {
      sinon.stub(salesModels, "findAll").resolves(allSales);
    })
    
    it('testa se a função "findAll" retorna todas as vendas', async function () {
      const result = await salesServices.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allSales);
    });

    it('testa se o retorno da função "findAll" é um array com 2 itens', async function () {
      const result = await salesServices.findAll();

      expect(result.message).to.be.an("array");
      expect(result.message).to.length(3);
    });
  });

  describe("teste rota /sales/:id", function () { 
    beforeEach(function () {
      sinon.stub(salesModels, "findById").resolves(findSale);
    });
    
    it('testa se a função "findById" retorna um item pelo ID', async function () { 
      const result = await salesServices.findById(2);
      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(findSale);
    });
    
    it('testa se o retorno da função "findById" um array', async function () {
      const result = await salesServices.findById(2);

      expect(result.message).to.be.an("array");
    });
   });
});
