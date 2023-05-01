const { salesServices } = require('../services');

const findAll = async (_req, res, _next) => {
  const { type, message } = await salesServices.findAll();

  if (type) return res.status(500).json({ message });

  res.status(200).json(message);
};

const findById = async (req, res, _next) => {
  const { id } = req.params;
  const { type, message } = await salesServices.findById(id);
  if (type) return res.status(type).json({ message });
  res.status(200).json(message);
  // res.status(200).json({ message: 'tudo ok aqui' });
};

const insert = async (req, res, _next) => {
  const newSale = req.body;

  const { type, message } = await salesServices.insert(newSale);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insert,
  findAll,
  findById,
};