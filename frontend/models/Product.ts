export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  img_url: string;
  rating: number;
  sizes: {
    name: string;
    width: number;
    length: number;
  }[];
}
