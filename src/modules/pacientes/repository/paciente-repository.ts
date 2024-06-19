import { PipelineStage } from 'mongoose';
import {
  CreatePacienteDto,
  CreatePacienteMenorDto,
} from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { Paciente } from '../entities/paciente.entity';
import { MonthlyStats } from '../services/find/types/typesFind';

export const PACIENTE_REPOSITORY = 'PacienteRepository';

export interface PacienteRepository {
  create(
    createPacienteDto: CreatePacienteDto,
    idNota: string,
    idAlergia: string,
  ): Promise<Paciente>;

  createPacienteMenor(
    createPacienteDto: CreatePacienteMenorDto,
    idNota: string,
    idAlergia: string,
  ): Promise<Paciente>;

  delete(id: string): Promise<Paciente>;
  update(id: string, updatePacienteDto: UpdatePacienteDto): Promise<Paciente>;

  aggregate(pipeline: PipelineStage[]): Promise<Paciente[]>;

  findByEmail(email: string): Promise<Paciente>;
  findByDni(dni: string): Promise<Paciente>;
  findByCelular(celular: string): Promise<Paciente>;

  findAll(): Promise<Paciente[]>;
  findByExistingEmail(email: string): Promise<Paciente>;
  findByExistingCelular(celular: string): Promise<Paciente>;
  findByExistingDni(dni: string): Promise<Paciente>;
  findById(id: string): Promise<Paciente>;

  findForMounthStatistics(): Promise<MonthlyStats[]>;
}
