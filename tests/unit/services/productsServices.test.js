const sinon = require("sinon");
const { expect } = require("chai");

const { productsServices } = require("../../../src/services");
const { allProducts } = require("./mocks/productsServices.mock");

describe('testa a camada service', function () {
  describe("teste rota /products", function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('testa se a função "findAll" retorna todos os produtos', async function () {
      sinon.stub(productsServices, 'findAll').resolves(allProducts);
      const result = await productsServices.findAll();
      expect(result).to.be.equal(allProducts);
    });
  
    it('testa se o retorno da função "findAll" é um array com 2 itens', async function () {
      sinon.stub(productsServices, "findAll").resolves(allProducts);
      const result = await productsServices.findAll();
      expect(result).to.be.an("array");
      expect(result).to.length(2);
    });
  });
})