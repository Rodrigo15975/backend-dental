import { MedicoRepository } from 'src/modules/medicos/repository/medico-repository';

export interface MedicoFind
  extends Omit<MedicoRepository, 'create' | 'delete' | 'update'> {
  findByDniExistingInUsuario(dni: string): Promise<void>;
  findByEmailExistingInUsuario(email: string): Promise<void>;
  findByPhoneExistingInUsuario(phone: string): Promise<void>;
}
