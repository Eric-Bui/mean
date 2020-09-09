export class Transaction {
  name: String;
  email: String;
  phone: String;
  address: String;
  discription: String;
  createDate: String;
  amount: number;
  status: Number;
  payment_method: Number;

  constructor(
    name: String,
    email: String,
    phone: string,
    address: String,
    discription: String,
    amount: number,
    createDate: String,
    status: Number,
    payment_method: Number
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.discription = discription;
    this.amount = amount;
    this.createDate = createDate;
    this.status = status;
    this.payment_method = payment_method;
  }
}
