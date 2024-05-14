import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { MedicoRepository } from 'src/modules/medicos/repository/medico-repository';

export interface MedicoFind
  extends Omit<
    MedicoRepository,
    | 'create'
    | 'delete'
    | 'update'
    | 'findOne'
    | 'updateProfile'
    | 'aggregate'
    | 'addNewServicesForMedicoWithDni'
    | 'deleteServicesForMedico'
  > {
  findByDniExistingInMedico(dni: string): Promise<void>;
  findByEmailExistingInMedico(email: string): Promise<void>;
  findByPhoneExistingInMedico(phone: string): Promise<void>;
  findAuthByMedico(identifier: string): Promise<Medico>;
}
