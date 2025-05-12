export function getLocalISOString(date: Date): string {
  const localISOString = date.toLocaleString('en-US', {
    timeZone: 'Asia/Jerusalem', // Use the desired time zone here
    hour12: false,  // Use 24-hour time format
  });
  return localISOString.slice(0, 16).replace(',', '');  // Ensure correct format (YYYY-MM-DDTHH:mm)
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
