import { Transform } from 'class-transformer';
import {
  IsDate,
  IsOptional,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { transformDateddMMyyyy } from '../utils/dateTransform/transformDate';
import { generalValidation, messageValidation } from '../utils/regs/reg';

export class CreatePersonaDto {
  @Matches(generalValidation.matchesDNI, { message: messageValidation.msgDNI })
  @MinLength(8, { message: 'Mínimo 8 ' })
  @MaxLength(8, { message: 'Máximo 8' })
  dni: string;

  @Matches(generalValidation.matchesLetras, {
    message: `Role ${messageValidation.msgLetras}`,
  })
  role: string;

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

  @Matches(generalValidation.matchesEmail, {
    message: `Email ${messageValidation.msgEmail}`,
  })
  email: string;

  @Matches(generalValidation.matchesPhones, {
    message: `Celular ${messageValidation.msgPhones}`,
  })
  celular: string;

  @Matches(generalValidation.matchesLetras, {
    message: `Genero ${messageValidation.msgLetras}`,
  })
  genero: string;

  @Transform(({ value }) => transformDateddMMyyyy(value))
  @IsDate({ message: 'Fecha: dd/MM/yyyy' })
  fechaNacimiento: string;

  @IsOptional()
  url_perfil: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: `Departamento ${messageValidation.msgLetras}`,
  })
  departamento: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: `Distrito ${messageValidation.msgLetras}`,
  })
  distrito: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: `Ciudad ${messageValidation.msgLetras}`,
  })
  ciudad: string;

  @IsOptional()
  @Matches(generalValidation.matchesDireccion, {
    message: `Dirección ${messageValidation.msgDireccion}`,
  })
  direccion: string;
}
