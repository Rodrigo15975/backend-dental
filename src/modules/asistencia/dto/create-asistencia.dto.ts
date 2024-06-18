import { Transform } from 'class-transformer';
import { IsBoolean, IsDate } from 'class-validator';
import { transformDateInternational } from 'src/common/utils/dateTransform/transformDate';

export class CreateAsistenciaDto {
  @Transform(({ value }) => transformDateInternational(value))
  @IsDate({ message: 'Fecha: yyyy-MM-dd' })
  fecha: string;

  hora: string;

  @IsBoolean({
    message: 'Asistio, solo acepta true or false',
  })
  asistio: boolean;

  idMedico: string;
}
