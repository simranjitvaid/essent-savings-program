import { Account, Transaction } from 'src/models/accounts-model';

export function calculateInterestOnSimulatedDay(account: Account, simulatedDay: number): number {
  
  let updatedSimulatedDay: number = simulatedDay;
  let interest: number = 0;
  let loopCounter: number = 1;
  const deposits: Transaction [] = account.transactions.filter((transaction) => transaction.type === 'deposit');
  const purchases: Transaction [] = account.transactions.filter((transaction) => transaction.type === 'purchase');

  while (updatedSimulatedDay >= 30) {
    //calculate interest
    const totalDepositsForCurrentPeriod: number = deposits.reduce((totalDeposit, deposit) => { if (deposit.simulatedDay < loopCounter * 30) { return totalDeposit += deposit.amount; } else { return totalDeposit; } }, 0);
    const totalPurchasesForCurrentPeriod: number = purchases.reduce((totalPurchase, purchase) => { if (purchase.simulatedDay <= loopCounter * 30) { return totalPurchase += purchase.amount; } else { return totalPurchase; } }, 0);
    const balance = totalDepositsForCurrentPeriod + totalPurchasesForCurrentPeriod;

    interest += (balance * (30 / 365) * (8 / 100));

    updatedSimulatedDay -= 30;
  }
  return interest;
}