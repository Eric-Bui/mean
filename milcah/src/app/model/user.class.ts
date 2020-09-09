export class User {
  name: String;
  email: String;
  password: string;
  cart: Object;
  totalPrice: Number;
  totalQty: Number;
  dayCreate: Date;
  constructor(
    name: string,
    email: string,
    password: string,
    cart: Object,
    totalPrice: Number,
    totalQty: Number,
    dayCreate: Date
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.cart = cart;
    this.totalPrice = totalPrice;
    this.totalQty = totalQty;
    this.dayCreate = dayCreate;
  }
}
