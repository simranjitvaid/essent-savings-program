import { Account, accounts, Deposit } from '../models/accounts-model';

export function addDepositToAccount(accountId: string, deposit: Deposit): Account {
  const index: number = accounts.findIndex((accounct) => accounct.id === accountId);
  accounts[index].transactions.push(deposit);
  return accounts[index];
}