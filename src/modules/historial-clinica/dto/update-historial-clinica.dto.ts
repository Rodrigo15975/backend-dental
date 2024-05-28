import { PartialType } from '@nestjs/mapped-types';
import { CreateHistorialClinicaDto } from './create-historial-clinica.dto';

export class UpdateHistorialClinicaDto extends PartialType(
  CreateHistorialClinicaDto,
) {}
