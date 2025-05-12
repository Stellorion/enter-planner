export function getLocalISOString(date: Date): string {
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatDateString(dateString: string) {
  return dateString.length > 10 ? dateString.slice(0, 16) : dateString;
}

export function truncateToNearestHour(date: Date): Date {
  date.setMinutes(0, 0, 0);
  return date;
}
