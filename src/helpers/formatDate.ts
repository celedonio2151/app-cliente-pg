import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Asegúrate de importar el idioma español
dayjs.locale('es'); // use Spanish locale globally

export function formatDate(datep: Date, format = 'dddd DD MMM YYYY') {
  const date = dayjs(datep);
  date.locale('es');
  const formattedDate = date.format(format);
  // console.log(formattedDate); // "Lunes 12 Oct 2023"
  return formattedDate;
}

export function calculateDaysRemaining(startDate: Date, endDate: Date) {
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  dayjs.locale('es'); // Establecer el idioma a español

  const daysDifference = end.diff(start, 'days');

  if (daysDifference >= 1) {
    return `${daysDifference} días restantes`;
  } else {
    const hoursDifference = end.diff(start, 'hours');
    return `${hoursDifference} horas restantes`;
  }
}

// Ejemplo de uso:
const startDate = '2023-10-10T19:33:24.103Z';
const endDate = '2023-10-15T19:33:24.103Z';

// const result = calculateDaysRemaining(startDate, endDate);
// console.log(result);

export function dateNameCustom(date: Date, format: string) {
  const formattedDate = dayjs(date);
  const invoiceName = formattedDate.format(format); // formato personalizado
  return invoiceName;
}
