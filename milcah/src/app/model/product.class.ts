export class Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  images: [];
  description: string;
  constructor(
    name: string,
    image: string,
    price: number,
    description: string,
    images: any
  ) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
    this.images = images;
  }
}
