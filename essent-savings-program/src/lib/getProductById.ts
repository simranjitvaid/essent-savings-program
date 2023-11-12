import { Product, products } from '../models/products-model';

export function getProductById(id: string): Product {
  return products.find((product) => product.id === id);
}