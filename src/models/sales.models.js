const connection = require('./connection');

const insert = async (newSale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW())',
  );

  newSale.forEach(async (element) => {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?)',
        [insertId, element.productId, element.quantity],
      );
  });
  return insertId;
};

module.exports = {
  insert,
};