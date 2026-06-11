import type { Bank } from "@/constants/banks";

export type AccountType =
  | "cheque"
  | "savings"
  | "credit-card"
  | "investment"
  | "loan"
  | "other";

export type Account = {
  id: string;
  bankId: Bank["id"];
  name: string;
  type: AccountType;
  balanceCents: number;
  currency: "ZAR";
  maskedNumber: string;
  createdAt: string;
  updatedAt: string;
};

export const ACCOUNT_TYPE_LABELS: Record<AccountType, string> = {
  cheque: "Cheque Account",
  savings: "Savings Account",
  "credit-card": "Credit Card",
  investment: "Investment",
  loan: "Loan",
  other: "Other",
};
