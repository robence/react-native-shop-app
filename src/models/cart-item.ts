export default class CartItem {
  quantity: number;
  productId: string;
  productPrice: number;
  productTitle: string;
  sum: number;

  constructor(
    quantity: number,
    productId: string,
    productPrice: number,
    productTitle: string,
    sum: number,
  ) {
    this.quantity = quantity;
    this.productId = productId;
    this.productPrice = productPrice;
    this.productTitle = productTitle;
    this.sum = sum;
  }
}
