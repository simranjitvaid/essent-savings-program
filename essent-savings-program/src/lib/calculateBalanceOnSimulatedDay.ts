import { Account, Transaction } from 'src/models/accounts-model';
import { calculateInterestOnSimulatedDay } from './calculateInterestOnSimulatedDay';

export function calculateBalanceOnSimulatedDay(account: Account, simulatedDay: number): number {
  
  const deposits: Transaction [] = account.transactions.filter((transaction) => transaction.type === 'deposit');
  const purchases: Transaction [] = account.transactions.filter((transaction) => transaction.type === 'purchase');

  const totalDepositsForCurrentPeriod: number = deposits.reduce((totalDeposit, deposit) => { if (deposit.simulatedDay < simulatedDay) { return totalDeposit += deposit.amount; } else { return totalDeposit; } }, 0);
  const totalPurchasesForCurrentPeriod: number = purchases.reduce((totalPurchase, purchase) => { if (purchase.simulatedDay <= simulatedDay) { return totalPurchase += purchase.amount; } else { return totalPurchase; } }, 0);
  
  const balance = totalDepositsForCurrentPeriod + totalPurchasesForCurrentPeriod + calculateInterestOnSimulatedDay(account, simulatedDay);

  return balance;
}