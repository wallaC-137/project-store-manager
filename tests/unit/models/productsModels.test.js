const sinon = require('sinon')
const { expect } = require('chai')

const { productsModels } = require('../../../src/models');
const connection = require('../../../src/models/connection')
const { allProducts } = require('./mocks/productsModels.mock');

describe('teste rota /products', function () {
  afterEach(function () {
    sinon.restore();
  })

  it('testa se a rota retorna todos os produtos', async function () { 
      sinon.stub(connection, 'execute').resolves([allProducts])
      const result = await productsModels.findAll()
      expect(result).to.be.equal(allProducts)
  })
  
  it('testa se o retorno da rota é um array', async function () {
    sinon.stub(connection, "execute").resolves([allProducts]);
    const result = await productsModels.findAll();
    expect(result).to.be.an("array");
    expect(result).to.length(3);
  })
})