const { productsServices } = require('../services');

const findAll = async (_req, res, _next) => {
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

const insert = async (req, res, _next) => {
  const { name } = req.body;
  if (!name) {
    return res
    .status(400)
    .json({ message: 'bad request: the key "name" is mandatory' }); 
  }

  const { type, message } = await productsServices.insert(name);

  if (type) {
    return res
      .status(type)
      .json(message);
  }

  res.status(201).json(message);
};

module.exports = {
  findAll,
  findById,
  insert,
};