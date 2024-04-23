import { PartialType } from '@nestjs/mapped-types';
import { CreateConsultarioDto } from './create-consultario.dto';

export class UpdateConsultarioDto extends PartialType(CreateConsultarioDto) {}
