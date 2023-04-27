const sinon = require("sinon");
const sinonChai = require("sinon-chai");
const chai = require("chai");
const { expect } = chai;

const { productsServices } = require("../../../src/services");
const { productsControllers } = require("../../../src/controllers");
const { allProducts, product } = require("./mocks/productsControllers.mock");

chai.use(sinonChai)

describe("testa a camada controller", function () {
  describe("teste rota /products", function () {
    afterEach(function () {
      sinon.restore();
    });

    it('testa se a função "findAll" retorna status 200 e um array de objetos com todos os produtos', async function () {

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
  });

  describe("teste rota /products/:id", function () {
    afterEach(function () {
      sinon.restore();
    });

    it('testa se a função "findById" retorna status 200 e um objetos com um produto', async function () {
      const res = {};
      const req = {
        params: { id: 1 }
      };

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      sinon
        .stub(productsServices, "findById")
        .resolves({ type: null, message: product });

      await productsControllers.findById(req, res);
      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(product);
    });
  });
});
