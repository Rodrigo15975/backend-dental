import { IsOptional, Matches, ValidateIf } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';
export class CreatePrescripcioneDto {
  @IsOptional()
  medico: string;

  @Matches(generalValidation.matchesLetras, {
    message: 'Prescripción solo acepta letras',
  })
  prescripcion: string;
  responsabilidad: string;

  @IsOptional()
  @ValidateIf((_, value) => value === undefined || value === null)
  @Matches(generalValidation.matchesLetras, {
    message: 'Nota adicional solo acepta letras',
  })
  notaAdicional: string;

  @IsOptional()
  fechaPrescripcion: string;
  @IsOptional()
  horaPrescripcion: string;
}
