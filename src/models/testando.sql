SELECT * FROM sales_products;

INSERT INTO sales_products (sale_id, product_id, quantity)
VALUES (1, 1, 2);

INSERT INTO sales (`date`) VALUES (NOW());

SELECT * FROM products WHERE id = 4;

SELECT S.date, SP.product_id productId,SP.quantity FROM sales S JOIN sales_products SP ON S.id = SP.sale_id WHERE id = 2;

