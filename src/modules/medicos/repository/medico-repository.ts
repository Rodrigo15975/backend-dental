import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { Medico } from '../entities/medico.entity';

export const MEDICO_REPOSITORY = 'RepositoryMedico';

export interface MedicoRepository {
  create(createMedicoDto: CreateMedicoDto): Promise<Medico>;
  update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<Medico>;
  delete(id: string): Promise<void>;

  findAllMedicos(): Promise<Medico[]>;

  findById(id: string): Promise<Medico>;
  findByEmail(email: string): Promise<Medico>;
  findByDni(dni: string): Promise<Medico>;
  findByPhone(celular: string): Promise<Medico>;

  findByEmailExisting(email: string): Promise<Medico>;
  findByDniExisting(dni: string): Promise<Medico>;
  findByPhoneExisting(celular: string): Promise<Medico>;
}
