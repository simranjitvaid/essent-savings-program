export type Deposit = {
  depositId: string;
  amount: number;
  simulatedDay: number;
  type: 'deposit';
};

export type Purchase = {
  productId: string;
  amount: number;
  simulatedDay: number;
  type: 'purchase';
};

export type Transaction = Deposit | Purchase;

export interface Account {
  id: string;
  name: string;
  transactions?: Transaction [];
}

export const accounts: Account [] = [];