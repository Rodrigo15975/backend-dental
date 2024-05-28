import { Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateApoderadoDto {
  @Matches(generalValidation.matchesDNI, {
    message: 'El Dni solo acepta 8 digitos',
  })
  dni: string;

  @Matches(generalValidation.matchesLetras, {
    message: 'Nombre solo caracteres',
  })
  nombre: string;

  @Matches(generalValidation.matchesLetras, {
    message: 'Apellidios solo caracteres',
  })
  apellidos: string;

  @Matches(generalValidation.matchesPhones, {
    message: 'celular solo 9 números',
  })
  celular: string;

  @Matches(generalValidation.matchesEmail, {
    message: 'Email solo caracteres',
  })
  email: string;

  fechaRegistro: string;
  horaRegistro: string;

  @Matches(generalValidation.matchesLetras, {
    message: 'Fuente de captación solo caracteres',
  })
  fuenteCaptacion: string;
}
