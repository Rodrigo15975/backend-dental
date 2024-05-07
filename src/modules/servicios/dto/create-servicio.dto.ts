import { Matches } from 'class-validator';
import {
  generalValidation,
  messageValidation,
} from 'src/common/utils/regs/reg';
export class CreateServicioDto {
  @Matches(generalValidation.matchesNumeros, {
    message: `El costo ${messageValidation.msgNumeros}`,
  })
  costo: number;

  @Matches(generalValidation.matchesLetras, {
    message: `El nombre del servicio ${messageValidation.msgLetras}`,
  })
  nombre: string;
  @Matches(generalValidation.matchesNumeros, {
    message: `el count ${messageValidation.msgNumeros}`,
  })
  count: number;
}
