import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import {
  CONSULTARIO_REPOSITORY,
  ConsultorioRepository,
} from '../repository/consultorio-repository';
import { FilesConsultorioService } from './files/files.consultorio.service';

@Injectable()
export class ConsultarioService {
  constructor(
    @Inject(CONSULTARIO_REPOSITORY)
    private readonly consultarioRepository: ConsultorioRepository,
    private readonly handledErrors: HandleErrors,
    private readonly consultorioCloudinaryService: CloudinaryService,
    private readonly filesConsultorioService: FilesConsultorioService,
  ) {}
  async uploadFilePortada(file: Express.Multer.File, id: string) {
    return await this.filesConsultorioService.uploadFilePortada(file, id);
  }
  async uploadFileLogo(file: Express.Multer.File, id: string) {
    return await this.filesConsultorioService.uploadFileLogo(file, id);
  }

  async create(createConsultarioDto: CreateConsultarioDto) {
    await this.consultarioRepository.create({
      ...createConsultarioDto,
      isRegisterConsultorio: true,
    });
    return this.handledErrors.handleSendMessage('Información agregada');
  }
  async find() {
    return await this.consultarioRepository.find();
  }

  async update(id: string, updateConsultarioDto: UpdateConsultarioDto) {
    await this.consultarioRepository.update(id, updateConsultarioDto);
    return this.handledErrors.handleSendMessage('Información actualizada');
  }

  async remove(id: string) {
    const consultorio = await this.filesConsultorioService.findById(id);
    await Promise.all([
      this.consultorioCloudinaryService.removeFile(
        consultorio.img_logo,
        consultorio.id_logo,
      ),
      this.consultorioCloudinaryService.removeFile(
        consultorio.img_consultorio,
        consultorio.id_img_consultorio,
      ),
    ]);
    await this.consultarioRepository.delete(id);
    return this.handledErrors.handleSendMessage('Información removida');
  }
}
