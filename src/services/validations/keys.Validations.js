const { productsModels } = require('../../models');

// const name = (key) => {
//   if (key.length < 5) {
//     return {
//       message: '"name" length must be at least 5 characters long',
//     };
//   }
// };

const checkInputValue = (newSale) => {
  const isError = !newSale.every((element) => element === null);

  if (isError) {
    const finalValue = newSale.find(
      (element) => element !== null && 'message' in element,
    );
    return { type: 400, ...finalValue };
  }
};

const checkKeysExist = (newSale) => {
  const isOk = newSale.map((element) => {
    if (!('productId' in element)) {
      return { message: '"productId" is required' };
    }

    if (!('quantity' in element)) {
      return { message: '"quantity" is required' };
    }
    return null;
  });
  return checkInputValue(isOk);
};

const checkProductExist = async (newSale) => {
  const isOk = await Promise.all(
    newSale.map(async (element) => {
      const { productId, quantity } = element;
      const idCheck = await productsModels.findById(productId);
      if (!idCheck) return { type: 404, message: 'Product not found' };

      if (Number(quantity) <= 0) {
        return {
          type: 422,
          message: '"quantity" must be greater than or equal to 1',
        };
      }
      return null;
    }),
  );
  return checkInputValue(isOk);
};

module.exports = {
  // name,
  checkKeysExist,
  checkProductExist,
};