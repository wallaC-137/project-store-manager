const sinon = require("sinon");
const { expect } = require("chai");

const { productsServices } = require("../../../src/services");
const { productsModels } = require("../../../src/models");
const { allProducts, product } = require("./mocks/productsServices.mock");

describe('testa a camada service', function () {
  describe("teste rota /products", function () {
    afterEach(function () {
      sinon.restore();
    });
  
    it('testa se a função "findAll" retorna todos os produtos', async function () {
      sinon.stub(productsModels, "findAll").resolves(allProducts);

      const result = await productsServices.findAll();

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(allProducts);
    });
  
    it('testa se o retorno da função "findAll" é um array com 2 itens', async function () {
      sinon.stub(productsModels, "findAll").resolves(allProducts);
      
      const result = await productsServices.findAll();
      
      expect(result.message).to.be.an("array");
      expect(result.message).to.length(2);
    });
  });

  describe("teste rota /products/:id", function () {
    afterEach(function () {
      sinon.restore();
    });

    it('testa se a função "findById" retorna um item pelo ID', async function () {
      const id = 1
      sinon.stub(productsModels, "findById").resolves(product);

      const result = await productsServices.findById(id);

      expect(result.type).to.equal(null);
      expect(result.message).to.deep.equal(product);
      // expect(result).to.be.equal(product);
    });

    it('testa se o retorno da função "findById" um objeto', async function () {
      const id = 1
      sinon.stub(productsModels, "findAll").resolves(product);

      const result = await productsServices.findById(id);

      expect(result.message).to.be.an("object");
    });
  });
})