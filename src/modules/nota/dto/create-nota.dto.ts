import { IsOptional, Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateNotaDto {
  @IsOptional()
  @Matches(generalValidation.matchesNotaAndAlergia, {
    message: 'Nota inválida',
  })
  nota: string;
}
