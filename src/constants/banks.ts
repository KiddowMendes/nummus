// constants/banks.ts
// South African Bank Visual System — Official brand gradients

export interface Bank {
  id: string;
  name: string;
  shortName: string;
  gradientFrom: string;
  gradientTo: string;
  sortOrder: number;
}

export const SEED_BANKS: Bank[] = [
  {
    id: 'fnb',
    name: 'First National Bank',
    shortName: 'FNB',
    gradientFrom: '#E85D04',
    gradientTo: '#F48C06',
    sortOrder: 1,
  },
  {
    id: 'capitec',
    name: 'Capitec Bank',
    shortName: 'Capitec',
    gradientFrom: '#003087',
    gradientTo: '#0057B7',
    sortOrder: 2,
  },
  {
    id: 'standardbank',
    name: 'Standard Bank',
    shortName: 'Standard Bank',
    gradientFrom: '#0033A0',
    gradientTo: '#0066CC',
    sortOrder: 3,
  },
  {
    id: 'nedbank',
    name: 'Nedbank',
    shortName: 'Nedbank',
    gradientFrom: '#007A4D',
    gradientTo: '#00B16A',
    sortOrder: 4,
  },
  {
    id: 'absa',
    name: 'Absa',
    shortName: 'Absa',
    gradientFrom: '#DC143C',
    gradientTo: '#FF4560',
    sortOrder: 5,
  },
  {
    id: 'tymebank',
    name: 'TymeBank',
    shortName: 'TymeBank',
    gradientFrom: '#00A651',
    gradientTo: '#00D66B',
    sortOrder: 6,
  },
  {
    id: 'discovery',
    name: 'Discovery Bank',
    shortName: 'Discovery',
    gradientFrom: '#8B5CF6',
    gradientTo: '#6D28D9',
    sortOrder: 7,
  },
  {
    id: 'other',
    name: 'Other Bank',
    shortName: 'Other',
    gradientFrom: '#4B5563',
    gradientTo: '#9CA3AF',
    sortOrder: 8,
  },
] as const;

export const SEED_BANKS_MAP: Record<string, Bank> = SEED_BANKS.reduce(
  (acc, bank) => ({ ...acc, [bank.id]: bank }),
  {}
);