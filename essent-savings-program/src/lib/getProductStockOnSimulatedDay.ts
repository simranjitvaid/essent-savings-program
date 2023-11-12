import { Product, Stock } from 'src/models/products-model';

export function getProductStockOnSimulatedDay(product: Product, simulatedDay: number): number {
  const stocks: Stock [] = product.stock.filter((stock) => stock.simulatedDay <= simulatedDay);
  return stocks[stocks.length - 1].stock;
  //console.log(product.stock.reduce((currentStock, stock) =>  { if (stock.simulatedDay <= simulatedDay) { return currentStock -= stock.stock; } else { return currentStock; } }, product.stock[0].stock));
  //return product.stock.reduce((currentStock, stock) =>  { if (stock.simulatedDay <= simulatedDay) { return currentStock -= stock.stock; } else { return currentStock; } }, product.stock[0].stock);
}