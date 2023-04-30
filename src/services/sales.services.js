const { salesModels } = require('../models');
// const { productsModels } = require('../models');
const { keysValidations } = require('./validations');

const insert = async (newSale) => {
  const check1 = keysValidations.checkKeysExist(newSale);
  if (check1) return check1;
  
  const check2 = await keysValidations.checkProductExist(newSale);
  if (check2) return check2;

  const result = await salesModels.insert(newSale);
  console.log(result);
  return { type: null, message: { id: result, itemsSold: newSale } };
};

module.exports = {
  insert,
};