const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(
    // 'SELECT * FROM sales_products;',
    `SELECT
      sales.id AS saleId,
      sales.date,
      sales_products.product_id AS productId,
      sales_products.quantity
    FROM
      sales
    JOIN
      sales_products
    ON
      sales.id = sales_products.sale_id`,
  );
  return result;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    // 'SELECT * FROM sales WHERE id = ?;',
    `SELECT
      S.date,
      SP.product_id productId,
      SP.quantity
    FROM
      sales S
    JOIN
      sales_products SP
    ON
      S.id = SP.sale_id
    WHERE id = ?;`,
    [id],
  );
  return result;
};

const insert = async (newSale) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUE (NOW());',
  );

  newSale.forEach(async (element) => {
      await connection.execute(
        'INSERT INTO sales_products (sale_id, product_id, quantity) VALUE (?, ?, ?);',
        [insertId, element.productId, element.quantity],
      );
  });
  return insertId;
};

module.exports = {
  insert,
  findAll,
  findById,
};