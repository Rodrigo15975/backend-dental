import { format, isValid, parse } from 'date-fns';

export const hourNowDate = () => format(new Date(), 'HH:mm:ss');

// forma standar 5/05/2024

export function transformDateddMMyyyy(value: string): Date | null {
  const date = parse(value, 'dd/MM/yyyy', new Date());
  return isValid(date) ? date : null;
}

// forma de fecha internacional
export function transformDateInternational(value: string): Date | null {
  const date = parse(value, 'yyyy-MM-dd', new Date());
  return isValid(date) ? date : null;
}

export const registerDateNow = () => {
  const fechaActual = new Date();
  const fechaFormateada = format(fechaActual, 'dd-MM-yyyy');
  return fechaFormateada;
};

export const registerDateInternational = () => {
  const fechaActual = new Date();
  const fechaFormateada = format(fechaActual, 'yyyy-MM-dd');
  return fechaFormateada;
};
