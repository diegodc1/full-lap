export function formatDateInfo(
  date: string,
  type: 'day' | 'month' | 'monthLong' | 'weekday' | 'year' | 'full' | 'dayMonthLong'
): string {
  const d = new Date(date.includes('T') ? date : `${date}T12:00:00`);


  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const monthShort = d.toLocaleString('pt-BR', { month: 'short' }).toUpperCase();
  const monthLong = d.toLocaleString('pt-BR', { month: 'long' }).toUpperCase();
  const weekday = d.toLocaleString('pt-BR', { weekday: 'long' });
  const year = d.getFullYear().toString();

  switch (type) {
    case 'day':
      return day;
    case 'dayMonthLong':
      return `${day} de ${d.toLocaleString('pt-BR', { month: 'long' })}`;
    case 'month':
      return monthShort;
    case 'monthLong':
      return monthLong;
    case 'weekday':
      return weekday.charAt(0).toUpperCase() + weekday.slice(1);
    case 'year':
      return year;
    case 'full':
      return `${day}/${month}/${year}`;
    default:
      return '';
  }
}


export function formatTime(date: string): string {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}