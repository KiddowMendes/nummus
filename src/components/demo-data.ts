// Demo data for Nummus - SA Student persona
// Realistic transactions for a student using Nummus v1

export interface DemoTransaction {
  id: string;
  title: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  date: string;
  account: string;
  icon: string;
}

export interface DemoAccount {
  id: string;
  name: string;
  bank: string;
  balance: number;
  type: "cheque" | "savings" | "credit";
  lastFour: string;
  color: string;
}

export interface DemoGoal {
  id: string;
  title: string;
  target: number;
  current: number;
  deadline: string;
  category: string;
}

export const demoAccounts: DemoAccount[] = [
  {
    id: "1",
    name: "Main Account",
    bank: "Capitec",
    balance: 8450.75,
    type: "cheque",
    lastFour: "4821",
    color: "#0A4D2E",
  },
  {
    id: "2",
    name: "Savings",
    bank: "FNB",
    balance: 3200.0,
    type: "savings",
    lastFour: "1193",
    color: "#0072AC",
  },
  {
    id: "3",
    name: "NSFAS Wallet",
    bank: "NSFAS",
    balance: 1500.0,
    type: "cheque",
    lastFour: "NSFAS",
    color: "#1B4D3E",
  },
];

export const demoTransactions: DemoTransaction[] = [
  {
    id: "t1",
    title: "NSFAS Allowance",
    amount: 4500.0,
    type: "income",
    category: "NSFAS",
    date: "2026-06-10",
    account: "NSFAS Wallet",
    icon: "🎓",
  },
  {
    id: "t2",
    title: "Instant Money to Mom",
    amount: -800.0,
    type: "expense",
    category: "Family",
    date: "2026-06-09",
    account: "Capitec",
    icon: "👩‍👧",
  },
  {
    id: "t3",
    title: "Spar Groceries",
    amount: -650.5,
    type: "expense",
    category: "Food",
    date: "2026-06-08",
    account: "Capitec",
    icon: "🛒",
  },
  {
    id: "t4",
    title: "Mr D Delivery",
    amount: 850.0,
    type: "income",
    category: "Side Hustle",
    date: "2026-06-07",
    account: "Capitec",
    icon: "🛵",
  },
  {
    id: "t5",
    title: "Stokvel Contribution",
    amount: -500.0,
    type: "expense",
    category: "Stokvel",
    date: "2026-06-05",
    account: "FNB",
    icon: "🤝",
  },
  {
    id: "t6",
    title: "Uber to Campus",
    amount: -45.0,
    type: "expense",
    category: "Transport",
    date: "2026-06-05",
    account: "Capitec",
    icon: "🚗",
  },
  {
    id: "t7",
    title: "WiFi Data Bundle",
    amount: -250.0,
    type: "expense",
    category: "Utilities",
    date: "2026-06-04",
    account: "Capitec",
    icon: "📶",
  },
  {
    id: "t8",
    title: "Textbook Resale",
    amount: 300.0,
    type: "income",
    category: "Side Hustle",
    date: "2026-06-03",
    account: "Capitec",
    icon: "📚",
  },
  {
    id: "t9",
    title: "Res Rent",
    amount: -2200.0,
    type: "expense",
    category: "Housing",
    date: "2026-06-01",
    account: "FNB",
    icon: "🏠",
  },
  {
    id: "t10",
    title: "NSFAS Allowance",
    amount: 4500.0,
    type: "income",
    category: "NSFAS",
    date: "2026-05-10",
    account: "NSFAS Wallet",
    icon: "🎓",
  },
];

export const demoGoals: DemoGoal[] = [
  {
    id: "g1",
    title: "Emergency Fund",
    target: 5000,
    current: 3200,
    deadline: "2026-12-31",
    category: "Savings",
  },
  {
    id: "g2",
    title: "Laptop Upgrade",
    target: 8000,
    current: 2100,
    deadline: "2027-02-28",
    category: "Tech",
  },
  {
    id: "g3",
    title: "Stokvel Payout",
    target: 6000,
    current: 6000,
    deadline: "2026-12-15",
    category: "Stokvel",
  },
];

export const demoInsights = {
  monthlyIncome: 5350,
  monthlyExpenses: 4445.5,
  savingsRate: 16.9,
  topCategory: "Housing",
  topCategoryAmount: 2200,
  streakDays: 12,
};

export const demoUser = {
  name: "Thabo",
  currency: "ZAR",
  totalBalance: 13150.75,
};
