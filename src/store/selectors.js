// eslint-disable-next-line import/prefer-default-export
export const getSelectedProduct = (id) => (state) =>
  state.products.availableProducts.find((product) => product.id === id);
