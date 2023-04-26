const { productsServices } = require('../services');

const findAll = async (req, res, _next) => {
  const { type, message } = await productsServices.findAll();

  if (type) return res.status(500).json(message);

  res.status(200).json(message);
};

const findById = async (req, res, _next) => {
  const { id } = req.params;
  const { type, message } = await productsServices.findById(id);

  if (type) return res.status(type).json({ message }); 

  res.status(200).json(message);
};

module.exports = {
  findAll,
  findById,
};