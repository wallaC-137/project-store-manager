const name = (key) => {
  if (key.length < 5) {
    return {
      message: '"name" length must be at least 5 characters long',
    };
  }
};

module.exports = {
  name,
};