import { IsOptional, IsString, Matches, ValidateIf } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';
export class CreateRecetaDto {
  @IsString()
  @IsOptional()
  medico: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Prescripción solo acepta letras y numeros',
  })
  receta: string;

  @IsString()
  @IsOptional()
  responsabilidad: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Nota adicional solo acepta letras y numeros',
  })
  notaAdicional: string;

  @IsString()
  @IsOptional()
  fechaReceta: string;

  @IsString()
  @IsOptional()
  horaReceta: string;
}
