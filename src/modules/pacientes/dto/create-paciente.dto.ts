import { OmitType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional, ValidateNested } from 'class-validator';
import { CreatePersonaDto } from 'src/common/validation/validation-persona';
import { CreateApoderadoDto } from 'src/modules/apoderado/dto/create-apoderado.dto';

export class CreatePacienteDto extends OmitType(CreatePersonaDto, [
  'contraseña',
]) {
  @IsBoolean({
    message: 'Mayor de edad false o true',
  })
  mayorEdad: boolean;

  @IsOptional()
  fuenteCaptacion: string;

  fechaRegistro: string;
  horaRegistro: string;
}

export class CreatePacienteMenorDto extends OmitType(CreatePersonaDto, [
  'contraseña',
]) {
  @ValidateNested()
  @Type(() => CreateApoderadoDto)
  apoderado: CreateApoderadoDto;
}
