import { IsString, Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateArchivoDto {
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'nombre del archivo solo letras y numeros',
  })
  nombre: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'descripción del archivo solo letras y números',
  })
  descripcion: string;

  horaCreacion: string;
  fechaCreacion: string;

  @IsString()
  medico: string;
}
