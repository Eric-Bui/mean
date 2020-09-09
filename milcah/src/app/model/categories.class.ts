export class Categories {
  _id: string;
  name: string;
  image: string;
  products: Array<any>;
  constructor(name: string, image: string, products: Array<any>) {
    this.name = name;
    this.image = image;
    this.products = products;
  }
}
