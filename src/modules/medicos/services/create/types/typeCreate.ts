import { CreateMedicoDto } from 'src/modules/medicos/dto/create-medico.dto';

export type Message = {
  message: string;
};

export interface MedicoCreate {
  create(createMedicoDto: CreateMedicoDto): Promise<void>;
}
