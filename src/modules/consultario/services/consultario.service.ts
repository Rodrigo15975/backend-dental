import { Inject, Injectable } from '@nestjs/common';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import {
  CONSULTARIO_REPOSITORY,
  ConsultorioRepository,
} from '../repository/consultorio-repository';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Injectable()
export class ConsultarioService {
  constructor(
    @Inject(CONSULTARIO_REPOSITORY)
    private readonly consultarioRepository: ConsultorioRepository,
    private readonly handledErrors: HandleErrors,
  ) {}
  async create(createConsultarioDto: CreateConsultarioDto) {
    await this.consultarioRepository.create({
      ...createConsultarioDto,
      isRegisterConsultorio: true,
    });
    return this.handledErrors.handleSendMessage('Datos agregados');
  }
  async find() {
    return await this.consultarioRepository.find();
  }

  async update(id: string, updateConsultarioDto: UpdateConsultarioDto) {
    await this.consultarioRepository.update(id, updateConsultarioDto);
    return this.handledErrors.handleSendMessage('Datos actualizados');
  }

  async remove(id: string) {
    await this.consultarioRepository.delete(id);
    return this.handledErrors.handleSendMessage('Datos removidos');
  }
}
