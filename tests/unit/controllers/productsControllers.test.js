const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
const { expect } = chai;

const { productsServices } = require("../../../src/services");
const { productsControllers } = require("../../../src/controllers");
const { allProducts } = require("./mocks/productsControllers.mock");

chai.use(sinonChai)

describe("testa a camada controller", function () {
  describe("teste rota /products", function () {
    afterEach(function () {
      sinon.restore();
    });

    it('testa se a função "findAll" retorna todos os produtos', async function () {

      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, "findAll")
        .resolves({ type: null, message: allProducts });
      
      await productsControllers.findAll(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allProducts);
    });

    // it('testa se o retorno da função "findAll" é um array com 2 itens', async function () {
    //   sinon.stub(productsServices, "findAll").resolves(allProducts);
    //   const result = await productsServices.findAll();
    //   expect(result).to.be.an("array");
    //   expect(result).to.length(2);
    // });
  });
});
