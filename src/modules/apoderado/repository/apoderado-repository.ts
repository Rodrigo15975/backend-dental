import { CreateApoderadoDto } from '../dto/create-apoderado.dto';
import { Apoderado } from '../entities/apoderado.entity';

export const APODERADO_REPOSITORY = 'ApoderadoRepository';

export interface ApoderadoRepository {
  create(createApoderadoDto: CreateApoderadoDto): Promise<Apoderado>;
  findByDni(dni: string): Promise<Apoderado>;
  deleteAllApoderados(id: string): Promise<void>;
}