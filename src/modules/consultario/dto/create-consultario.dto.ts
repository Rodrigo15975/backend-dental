import { IsOptional, Matches, ValidateIf } from 'class-validator';
import {
  generalValidation,
  messageValidation,
} from 'src/common/utils/regs/reg';

export class CreateConsultarioDto {
  @Matches(generalValidation.matchesRuc, {
    message: messageValidation.msgRuc,
  })
  ruc: string;

  @IsOptional()
  img_consultorio: string;

  @IsOptional()
  logo: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  razonSocial: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesPhones, {
    message: messageValidation.msgPhones,
  })
  telefono: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  estado: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  condicion: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesDireccion, {
    message: messageValidation.msgDireccion,
  })
  direccion: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  departamento: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  provincia: string;

  @ValidateIf((_, value) => value === undefined || value === null)
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  distrito: string;

  @IsOptional()
  isRegisterConsultorio: boolean;
}
