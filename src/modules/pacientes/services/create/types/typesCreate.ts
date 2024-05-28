import { CreatePacienteDto } from 'src/modules/pacientes/dto/create-paciente.dto';

export interface PacienteCreate {
  create(createPacienteDto: CreatePacienteDto): Promise<void>;
}
