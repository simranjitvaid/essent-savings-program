import { Account } from 'src/models/accounts-model';

export function calculateBalanceOnSimulatedDay(account: Account, simulatedDay: number): number {
  return account.transactions.reduce((balance, transaction) => { if (transaction.simulatedDay < simulatedDay) { return balance += transaction.amount; } else { return balance; } }, 0);
}