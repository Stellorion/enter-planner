export function getLocalISOString(date: Date): string {
  const tzOffsetMs = date.getTimezoneOffset() * 60000;
  const localISOTime = new Date(date.getTime() - tzOffsetMs)
    .toISOString()
    .slice(0, 16);
  return localISOTime;
}

export function formatDateString(date: string | Date | null | undefined): string {
  if (!date) return '';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '';

  const tzOffsetMs = d.getTimezoneOffset() * 60000;
  const local = new Date(d.getTime() - tzOffsetMs);
  
  return local.toISOString().slice(0, 16);
}


export function truncateToNearestHour(date: Date): Date {
  date.setMinutes(0, 0, 0);
  return date;
}
