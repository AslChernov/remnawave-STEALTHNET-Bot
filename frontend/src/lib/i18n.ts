export function formatRuDays(n: number): string {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${n} дней`;
  if (last === 1) return `${n} день`;
  if (last >= 2 && last <= 4) return `${n} дня`;
  return `${n} дней`;
}

export function formatRuDaysFrom(n: number, from: "за" | "на" | "через" = "на"): string {
  return `${from} ${formatRuDays(n)}`;
}

export function formatRuDevices(n: number): string {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${n} устройств`;
  if (last === 1) return `${n} устройство`;
  if (last >= 2 && last <= 4) return `${n} устройства`;
  return `${n} устройств`;
}

export function formatRuDevicesTo(n: number): string {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${n} устройств`;
  if (last === 1) return `${n} устройства`;
  return `${n} устройств`;
}

export function formatRuSlots(n: number): string {
  const abs = Math.abs(n);
  const lastTwo = abs % 100;
  const last = abs % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${n} слотов`;
  if (last === 1) return `${n} слот`;
  if (last >= 2 && last <= 4) return `${n} слота`;
  return `${n} слотов`;
}
