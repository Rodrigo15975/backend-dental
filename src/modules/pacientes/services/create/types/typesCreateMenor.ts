import { CreatePacienteMenorDto } from 'src/modules/pacientes/dto/create-paciente.dto';

export interface PacienteCreateMenor {
  createPacienteMenor(createPacienteDto: CreatePacienteMenorDto): Promise<void>;
}
