import { PartialType } from '@nestjs/mapped-types';
import { PropsCreateServicioDto } from './create-servicio.dto';

export class UpdateServicioDto extends PartialType(PropsCreateServicioDto) {}
