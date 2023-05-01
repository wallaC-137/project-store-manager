const { salesModels } = require('../models');
// const { productsModels } = require('../models');
const { keysValidations } = require('./validations');

const findAll = async () => {
  const result = await salesModels.findAll();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await salesModels.findById(id);
  const checkLength = keysValidations.checkLength(result);

  if (checkLength) return { type: 404, message: 'Sale not found' };

  const checkReturn = await keysValidations.checkReturn(result);
  return { type: null, message: checkReturn };
};

const insert = async (newSale) => {
  const check1 = keysValidations.checkKeysExist(newSale);
  if (check1) return check1;
  
  const check2 = await keysValidations.checkProductExist(newSale);
  if (check2) return check2;

  const result = await salesModels.insert(newSale);
  return { type: null, message: { id: result, itemsSold: newSale } };
};

module.exports = {
  insert,
  findAll,
  findById,
};