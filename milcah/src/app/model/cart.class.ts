export class Cart {
  _id: string;
  sessionId: String;
  cart: Object;
  totalPrice: number;
  totalQty: number;
  constructor(
    sessionId: String,
    cart: Object,
    totalPrice: number,
    totalQty: number
  ) {
    this.sessionId = sessionId;
    this.cart = cart;
    this.totalPrice = totalPrice;
    this.totalQty = totalQty;
  }
}
