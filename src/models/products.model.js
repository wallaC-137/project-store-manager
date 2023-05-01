const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM products;',
  );

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM products WHERE id = ?;',
    [productId],
  );
  return result;
};

const insert = async (productName) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO products (name) VALUE (?);',
    [productName],
  );
  return insertId;
};

const update = async (productId, productName) => {
  await connection.execute(
    'UPDATE products SET name = ? WHERE id = ?;',
    [productName, productId],
  );
  return { id: Number(productId), name: productName };
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
};