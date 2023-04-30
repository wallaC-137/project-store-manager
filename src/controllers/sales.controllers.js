const { salesServices } = require('../services');

const insert = async (req, res, _next) => {
  const newSale = req.body;

  const { type, message } = await salesServices.insert(newSale);

  if (type) return res.status(type).json({ message });

  res.status(201).json(message);
};

module.exports = {
  insert,
};