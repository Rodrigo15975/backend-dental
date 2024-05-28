import { IsOptional, Matches } from 'class-validator';
import { generalValidation } from 'src/common/utils/regs/reg';

export class CreateEtiquetaDto {
  @IsOptional()
  @Matches(generalValidation.matchesLetras, {
    message: 'Etiquetas, solo permite caracteres',
  })
  etiqueta: string;

  _id: string;
  bgColor: string;
}

export class AsignarEtiquetas {
  tags: CreateEtiquetaDto[];
  idPaciente: string;
}
