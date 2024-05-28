import { IsOptional, Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateAlergiaDto {
  @IsOptional()
  @Matches(generalValidation.matchesNotaAndAlergia, {
    message: 'Alergia inválida',
  })
  alergias: string;
}
