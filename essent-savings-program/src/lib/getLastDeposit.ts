import { Account, Transaction } from 'src/models/accounts-model';

export function getLastDeposit(account: Account): Transaction {
  const deposits: Transaction [] = account.transactions.filter((transaciton) => transaciton.type === 'deposit');
  return deposits[deposits.length - 1];
}