import { IsString } from 'class-validator';

export class CreateEstadoCitaDto {
  @IsString()
  estado: string;

  @IsString()
  bg: string;
}
