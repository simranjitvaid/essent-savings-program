import { products } from '../models/products-model';
import { accounts, Purchase } from '../models/accounts-model';

export function addPurchaseToAccount(accountId: string, purchase: Purchase, simulatedDay: number) {
  const index: number = accounts.findIndex((accounct) => accounct.id === accountId);
  accounts[index].transactions.push(purchase);
  const tempProduct = products.find((product) => product.id === purchase.productId);
  tempProduct.stock.push( { stock: tempProduct.stock[tempProduct.stock.length - 1].stock - 1, simulatedDay: simulatedDay } );
}