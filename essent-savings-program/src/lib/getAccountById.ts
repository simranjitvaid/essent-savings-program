import { Account, accounts } from '../models/accounts-model';

export function getAccountById(id: string): Account {
  return accounts.find((accounct) => accounct.id === id);
}