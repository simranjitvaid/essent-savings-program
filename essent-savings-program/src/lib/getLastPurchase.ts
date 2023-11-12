import { Account, Transaction } from 'src/models/accounts-model';

export function getLastPurchase(account: Account): Transaction {
  const purchases: Transaction [] = account.transactions.filter((transaciton) => transaciton.type === 'purchase');
  return purchases[purchases.length - 1];
}