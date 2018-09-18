const orderTotal = productList => {
  return productList.length
    ? productList
        .map(product => Number(product.price))
        .reduce((curr, acc) => curr + acc, 0)
    : 0
}

module.exports = {
  orderTotal,
};
