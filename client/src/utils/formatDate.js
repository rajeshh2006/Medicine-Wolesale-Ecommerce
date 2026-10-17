export const formatDate = (dateString, format = 'DD/MM/YYYY') => {
  if (!dateString) return '-';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '-';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const fullYear = date.getFullYear();
  const shortYear = String(fullYear).slice(-2);

  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const strHours = String(hours).padStart(2, '0');

  if (format === 'DD/MM/YY') {
    return `${day}/${month}/${shortYear}`;
  }
  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${fullYear}`;
  }
  if (format === 'hh:mm A') {
    return `${strHours}:${minutes} ${ampm}`;
  }
  if (format === 'DD/MM/YYYY hh:mm A') {
    return `${day}/${month}/${fullYear} ${strHours}:${minutes} ${ampm}`;
  }

  return date.toLocaleDateString();
};

export const isWithinDateRange = (dateStr, startDateStr, endDateStr) => {
  if (!dateStr) return false;
  const d = new Date(dateStr).getTime();
  if (isNaN(d)) return false;

  if (startDateStr) {
    const start = new Date(startDateStr);
    start.setHours(0, 0, 0, 0);
    if (d < start.getTime()) return false;
  }

  if (endDateStr) {
    const end = new Date(endDateStr);
    end.setHours(23, 59, 59, 999);
    if (d > end.getTime()) return false;
  }

  return true;
};

export default formatDate;
