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
    balance: 12450.75,
    type: "cheque",
    lastFour: "4821",
    color: "#003087",
  },
  {
    id: "2",
    name: "Savings",
    bank: "FNB",
    balance: 8200.0,
    type: "savings",
    lastFour: "1193",
    color: "#E85D04",
  },
  {
    id: "3",
    name: "Everyday Account",
    bank: "Standard Bank",
    balance: 3500.0,
    type: "cheque",
    lastFour: "7762",
    color: "#0033A0",
  },
];

export const demoTransactions: DemoTransaction[] = [
  {
    id: "t1",
    title: "Salary Deposit",
    amount: 18500.0,
    type: "income",
    category: "Salary",
    date: "2026-06-10",
    account: "Capitec",
    icon: "💰",
  },
  {
    id: "t2",
    title: "Spar Groceries",
    amount: -850.5,
    type: "expense",
    category: "Food",
    date: "2026-06-09",
    account: "Capitec",
    icon: "🛒",
  },
  {
    id: "t3",
    title: "Freelance Payment",
    amount: 3200.0,
    type: "income",
    category: "Side Hustle",
    date: "2026-06-08",
    account: "FNB",
    icon: "💼",
  },
  {
    id: "t4",
    title: "Stokvel Payout",
    amount: 1500.0,
    type: "income",
    category: "Stokvel",
    date: "2026-06-07",
    account: "Standard Bank",
    icon: "🤝",
  },
  {
    id: "t5",
    title: "Uber Trips",
    amount: -230.0,
    type: "expense",
    category: "Transport",
    date: "2026-06-06",
    account: "Capitec",
    icon: "🚗",
  },
  {
    id: "t6",
    title: "Netflix Subscription",
    amount: -159.0,
    type: "expense",
    category: "Entertainment",
    date: "2026-06-05",
    account: "Capitec",
    icon: "📺",
  },
  {
    id: "t7",
    title: "Data Bundle",
    amount: -299.0,
    type: "expense",
    category: "Utilities",
    date: "2026-06-04",
    account: "Capitec",
    icon: "📶",
  },
  {
    id: "t8",
    title: "Takealot Order",
    amount: -450.0,
    type: "expense",
    category: "Shopping",
    date: "2026-06-03",
    account: "FNB",
    icon: "📦",
  },
  {
    id: "t9",
    title: "Bond Payment",
    amount: -5200.0,
    type: "expense",
    category: "Housing",
    date: "2026-06-01",
    account: "Standard Bank",
    icon: "🏠",
  },
  {
    id: "t10",
    title: "Interest Earned",
    amount: 85.75,
    type: "income",
    category: "Interest",
    date: "2026-05-31",
    account: "FNB",
    icon: "📈",
  },
];

export const demoGoals: DemoGoal[] = [
  {
    id: "g1",
    title: "Emergency Fund",
    target: 25000,
    current: 12450,
    deadline: "2026-12-31",
    category: "Savings",
  },
  {
    id: "g2",
    title: "Holiday to Cape Town",
    target: 15000,
    current: 8700,
    deadline: "2027-03-31",
    category: "Travel",
  },
  {
    id: "g3",
    title: "Stokvel Payout",
    target: 12000,
    current: 12000,
    deadline: "2026-12-15",
    category: "Stokvel",
  },
];

export const demoInsights = {
  monthlyIncome: 25285.75,
  monthlyExpenses: 7188.5,
  savingsRate: 28.4,
  topCategory: "Housing",
  topCategoryAmount: 5200,
  streakDays: 18,
};

export const demoUser = {
  name: "Thabo",
  currency: "ZAR",
  totalBalance: 24150.75,
};
