export type Bank = {
  id: string;
  name: string;
  shortName: string;
  gradientFrom: string;
  gradientTo: string;
  accentColor: string;
  sortOrder: number;
};

export const SEED_BANKS: readonly Bank[] = [
  {
    id: "fnb",
    name: "First National Bank",
    shortName: "FNB",
    gradientFrom: "#E85D04",
    gradientTo: "#F48C06",
    accentColor: "#F48C06",
    sortOrder: 1,
  },
  {
    id: "capitec",
    name: "Capitec Bank",
    shortName: "Capitec",
    gradientFrom: "#003087",
    gradientTo: "#0057B7",
    accentColor: "#0057B7",
    sortOrder: 2,
  },
  {
    id: "standard-bank",
    name: "Standard Bank",
    shortName: "Standard Bank",
    gradientFrom: "#0033A0",
    gradientTo: "#0066CC",
    accentColor: "#0066CC",
    sortOrder: 3,
  },
  {
    id: "nedbank",
    name: "Nedbank",
    shortName: "Nedbank",
    gradientFrom: "#007A4D",
    gradientTo: "#00B16A",
    accentColor: "#00B16A",
    sortOrder: 4,
  },
  {
    id: "absa",
    name: "Absa Bank",
    shortName: "Absa",
    gradientFrom: "#DC143C",
    gradientTo: "#FF4560",
    accentColor: "#FF4560",
    sortOrder: 5,
  },
  {
    id: "discovery",
    name: "Discovery Bank",
    shortName: "Discovery",
    gradientFrom: "#5B21B6",
    gradientTo: "#7C3AED",
    accentColor: "#7C3AED",
    sortOrder: 6,
  },
  {
    id: "other",
    name: "Other Bank",
    shortName: "Other",
    gradientFrom: "#475569",
    gradientTo: "#94A3B8",
    accentColor: "#94A3B8",
    sortOrder: 7,
  },
] as const;

export const BANK_IDS = {
  FNB: "fnb",
  CAPITEC: "capitec",
  STANDARD_BANK: "standard-bank",
  NEDBANK: "nedbank",
  ABSA: "absa",
  DISCOVERY: "discovery",
  OTHER: "other",
} as const;

export type BankId = (typeof BANK_IDS)[keyof typeof BANK_IDS];

export const SEED_BANKS_MAP: Record<string, Bank> = SEED_BANKS.reduce(
  (map, bank) => {
    map[bank.id] = bank;
    return map;
  },
  {} as Record<string, Bank>,
);
