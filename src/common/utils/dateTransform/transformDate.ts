import { isValid, parse } from 'date-fns';
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
