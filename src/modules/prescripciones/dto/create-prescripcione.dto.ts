import { IsOptional, Matches, ValidateIf } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';
export class CreatePrescripcioneDto {
  @IsOptional()
  medico: string;

  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Prescripción solo acepta letras y numeros',
  })
  prescripcion: string;
  responsabilidad: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetrasAndNumbers, {
    message: 'Nota adicional solo acepta letras y numeros',
  })
  notaAdicional: string;

  @IsOptional()
  fechaPrescripcion: string;
  @IsOptional()
  horaPrescripcion: string;
}
