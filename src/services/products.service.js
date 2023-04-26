const { productsModels } = require('../models');

const findAll = async () => { 
  const result = await productsModels.findAll();
  return { type: null, message: result };
};

const findById = async (productId) => {
  const result = await productsModels.findById(productId);
  if (!result) return { type: 404, message: 'Product not found' };
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
};