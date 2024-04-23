import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import { Consultario } from '../entities/consultario.entity';

export const CONSULTARIO_REPOSITORY: string = 'ConsultorioRepository';

export interface ConsultorioRepository {
  create(data: CreateConsultarioDto): Promise<Consultario>;
  delete(id: string): Promise<Consultario>;
  update(id: string, data: UpdateConsultarioDto): Promise<Consultario>;
  find(): Promise<Consultario>;
}
