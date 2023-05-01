const { productsModels } = require('../models');
const { keysValidations } = require('./validations');

const findAll = async () => { 
  const result = await productsModels.findAll();
  return { type: null, message: result };
};

const findById = async (productId) => {
  const result = await productsModels.findById(productId);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

const insert = async (productName) => {
  const message = keysValidations.name(productName);
  if (message) return { type: 422, message };
  
  const result = await productsModels.insert(productName);
  const newProduct = await productsModels.findById(result);
  return { type: null, message: newProduct };
};
  
const update = async (productId, productName) => {
  const checkLength = keysValidations.name(productName);
  if (checkLength) return { type: 422, message: checkLength.message };

  const checkId = await productsModels.findById(productId);
  if (!checkId) return { type: 404, message: 'Product not found' };
  
  const result = await productsModels.update(productId, productName);
  return { type: null, message: result };
};

const remove = async (productId) => {
  const checkId = await productsModels.findById(productId);
  if (!checkId) return { type: 404, message: 'Product not found' };
  
  await productsModels.remove(productId);
  return { type: null, message: '' };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  remove,
};