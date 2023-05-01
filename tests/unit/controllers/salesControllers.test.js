const sinon = require('sinon');
const { expect } = require('chai');

const { salesServices } = require('../../../src/services');
const { salesControllers } = require("../../../src/controllers");
const { allSales, findSale } = require("../services/mocks/salesServices.mock");
const { beforeEach } = require('mocha');

describe('testa a camada controller', function () {
  afterEach(function () {
    sinon.restore();
  });
  describe('teste rota /sales', function () {
    beforeEach(function () {
      sinon
        .stub(salesServices, 'findAll')
        .resolves({ type: null, message: allSales });
    });

    it('testa se a função "findAll" retorna status 200 e um array de objetos com todas as vendas', async function () {
      const req = {};
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.findAll(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });

  describe('teste rota /sales/:id', function () {
    beforeEach(function () {
      sinon
        .stub(salesServices, 'findById')
        .resolves({ type: null, message: findSale });
    });

    it('testa se a função "findById" retorna status 200 e um objeto com uma venda', async function () {
      const req = {
        params: { id: 1 }
      };
      const res = {};

      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns();

      await salesControllers.findById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(findSale);
    });
  });
});