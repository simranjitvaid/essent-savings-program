export interface Deposit {
  depositId: string;
  amount: number;
  depositDay: number;
}

export type Balance = {
  amount: number;
  day: number
};

export interface Account {
  id: string;
  name: string;
  balance: Balance [];
  deposits?: Deposit [];
}

export const accounts: Account [] = [];