import { Account, accounts, Deposit, Balance } from '../models/accounts-model';

export function addDepositToAccount(accountId: string, deposit: Deposit): Account {
  const index: number = accounts.findIndex((accounct) => accounct.id === accountId);
  accounts[index].deposits.push(deposit);
  const balance: Balance = {
    amount: accounts[index].balance[accounts[index].balance.length - 1].amount + deposit.amount,
    day: deposit.depositDay + 1,
  };
  accounts[index].balance.push(balance);
  return accounts[index];
}