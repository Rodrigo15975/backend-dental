import { Type } from 'class-transformer';
import { Matches, ValidateNested } from 'class-validator';
import {
  generalValidation,
  messageValidation,
} from 'src/common/utils/regs/reg';
export class CreateServicioDto {
  @ValidateNested({ each: true })
  @Type(() => PropsCreateServicioDto)
  servicios: PropsCreateServicioDto[];
}

export class PropsCreateServicioDto {
  // Sol oacepta dos ceros la final, importante
  @Matches(generalValidation.matchesCosto, {
    message: messageValidation.msgCosto,
  })
  costo: string;

  @Matches(generalValidation.matchesLetras, {
    message: `El nombre del servicio ${messageValidation.msgLetras}`,
  })
  nombre: string;
}
export type PropsCreateServicioForMedicoDto = Omit<
  PropsCreateServicioDto,
  'costo'
>[];

type PropsAddNewServices = {
  _id: string;
};
// // Añadir servicios existente al medico
export type AddNewServicesForMedicoWithDni = {
  servicios: PropsAddNewServices[];
};
