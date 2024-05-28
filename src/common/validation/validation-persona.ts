import { Transform } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { transformDateInternational } from '../utils/dateTransform/transformDate';
import { generalValidation, messageValidation } from '../utils/regs/reg';
import { RolesKey } from 'src/modules/roles/entities/default-role';

export class CreatePersonaDto {
  @Matches(generalValidation.matchesDNI, { message: messageValidation.msgDNI })
  @MinLength(8, { message: 'Mínimo 8 ' })
  @MaxLength(8, { message: 'Máximo 8' })
  dni: string;

  @Matches(generalValidation.matchesLetras, {
    message: `Role ${messageValidation.msgLetras}`,
  })
  role: RolesKey;

  @Matches(generalValidation.matchesLetras, {
    message: `Apellidos ${messageValidation.msgLetras}`,
  })
  apellidos: string;

  @Matches(generalValidation.matchesLetras, {
    message: `Nombre ${messageValidation.msgLetras}`,
  })
  name: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: `Contraseña ${messageValidation.msgPassword}`,
  })
  contraseña: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesEmail, {
    message: `Email ${messageValidation.msgEmail}`,
  })
  email: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesPhones, {
    message: `Celular ${messageValidation.msgPhones}`,
  })
  celular: string;

  @Matches(generalValidation.matchesLetras, {
    message: `Genero ${messageValidation.msgLetras}`,
  })
  genero: string;

  // se esta usando la international fecha
  @Transform(({ value }) => transformDateInternational(value))
  @IsDate({ message: 'Fecha: yyyy-MM-dd' })
  fechaNacimiento: string;

  @IsOptional()
  url_perfil: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetras, {
    message: `Departamento ${messageValidation.msgLetras}`,
  })
  departamento?: string | undefined;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetras, {
    message: `Distrito ${messageValidation.msgLetras}`,
  })
  distrito?: string | undefined;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetras, {
    message: `Ciudad ${messageValidation.msgLetras}`,
  })
  ciudad?: string | undefined;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesDireccion, {
    message: `Dirección ${messageValidation.msgDireccion}`,
  })
  direccion?: string | undefined;
}
