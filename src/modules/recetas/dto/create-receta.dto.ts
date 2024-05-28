import { IsOptional, IsString, Matches, ValidateIf } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';
export class CreateRecetaDto {
  @IsOptional()
  @IsString()
  medico: string;

  @Matches(generalValidation.matchesLetras, {
    message: 'Prescripción solo acepta letras',
  })
  receta: string;

  @IsString()
  @IsOptional()
  responsabilidad: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetras, {
    message: 'Nota adicional solo acepta letras',
  })
  notaAdicional: string;

  @IsString()
  @IsOptional()
  fechaReceta: string;

  @IsString()
  @IsOptional()
  horaReceta: string;
}
