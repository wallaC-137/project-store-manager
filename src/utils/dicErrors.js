const dicErrors = {
  PRODUCT_NOT_FOUND: 404,
  // ...
  // ...
};

const mapError = (type) => dicErrors[type] || 500;

module.exports = {
  dicErrors,
  mapError,
};
