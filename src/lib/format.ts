export function formatZAR(cents: number): string {
  const rand = Math.abs(cents) / 100;
  const formatted = rand.toLocaleString("en-ZA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return cents < 0 ? `-R${formatted}` : `R${formatted}`;
}
