// features/accounts/types.ts

export type AccountType = 
  | 'cheque' 
  | 'savings' 
  | 'credit-card' 
  | 'investment' 
  | 'loan' 
  | 'other';

export interface Account {
  id: string;
  bankId: string;
  name: string;
  type: AccountType;
  balanceCents: number;
  createdAt: string;
}

export interface BankCardProps {
  bank: {
    id: string;
    name: string;
    shortName: string;
    gradientFrom: string;
    gradientTo: string;
  };
  accountName?: string;
  accountType?: AccountType;
  balanceCents?: number;
}