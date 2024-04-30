import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import {
  CONSULTARIO_REPOSITORY,
  ConsultorioRepository,
} from '../repository/consultorio-repository';

@Injectable()
export class ConsultarioService {
  constructor(
    @Inject(CONSULTARIO_REPOSITORY)
    private readonly consultarioRepository: ConsultorioRepository,
    private readonly handledErrors: HandleErrors,
  ) {}

  async findById(id: string) {
    const consultorio = await this.consultarioRepository.findById(id);
    if (!consultorio)
      this.handledErrors.handleErrorsBadRequestException(
        'Consultorio no registrado',
      );
    return consultorio;
  }

  async findByIdUpdateLogoConsultorio(
    id: string,
    img_logo: string,
    id_logo: string,
  ) {
    await this.consultarioRepository.findByIdUpdateLogoConsultorio(
      id,
      img_logo,
      id_logo,
    );
    return this.handledErrors.handleSendMessage('Cambio Exitoso');
  }

  async findByIdUpdateImgConsultorio(
    id: string,
    img_consultorio: string,
    id_img_consultorio: string,
  ) {
    await this.consultarioRepository.findByIdUpdateImgConsultorio(
      id,
      img_consultorio,
      id_img_consultorio,
    );

    return this.handledErrors.handleSendMessage('Cambio Exitoso');
  }

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
