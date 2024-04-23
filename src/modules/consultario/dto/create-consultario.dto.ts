import { IsOptional, Matches } from 'class-validator';
import {
  generalValidation,
  messageValidation,
} from 'src/common/utils/regs/reg';

export class CreateConsultarioDto {
  @IsOptional()
  img_consultorio: string;

  @IsOptional()
  logo: string;

  @Matches(generalValidation.matchesRuc, {
    message: messageValidation.msgRuc,
  })
  ruc: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  razonSocial: string;

  @Matches(generalValidation.matchesPhones, {
    message: messageValidation.msgPhones,
  })
  @IsOptional()
  telefono: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  estado: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  condicion: string;

  @Matches(generalValidation.matchesDireccion, {
    message: messageValidation.msgDireccion,
  })
  @IsOptional()
  direccion: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  departamento: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  provincia: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  @IsOptional()
  distrito: string;

  @IsOptional()
  isRegisterConsultorio: boolean;
}
