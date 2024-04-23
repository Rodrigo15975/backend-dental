import { IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
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

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: messageValidation.msgPassword,
  })
  contraseña: string;

  @Matches(generalValidation.matchesEmail, {
    message: messageValidation.msgEmail,
  })
  email: string;

  @Matches(generalValidation.matchesPhones, {
    message: messageValidation.msgPhones,
  })
  celular: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  genero: string;

  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  fechaNacimiento: string;

  @IsOptional()
  url_perfil: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  departamento: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  distrito: string;

  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: messageValidation.msgLetras,
  })
  ciudad: string;

  @IsOptional()
  @Matches(generalValidation.matchesDireccion, {
    message: messageValidation.msgDireccion,
  })
  direccion: string;
}
