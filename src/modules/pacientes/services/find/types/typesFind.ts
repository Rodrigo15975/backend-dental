import { Paciente } from 'src/modules/pacientes/entities/paciente.entity';

export interface PacienteFind {
  findAll(): Promise<Paciente[]>;
  findByEmail(email: string): Promise<Paciente>;
  findByDni(dni: string): Promise<Paciente>;
  findByCelular(celular: string): Promise<Paciente>;
  findByExistingEmail(email: string): Promise<Paciente>;
  findByExistingCelular(celular: string): Promise<Paciente>;
  findByExistingDni(dni: string): Promise<Paciente>;
  findById(id: string): Promise<Paciente>;
}
