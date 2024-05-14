import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CloudinaryService } from 'src/services/cloudinary/cloudinary.service';
import {
  CONSULTARIO_REPOSITORY,
  ConsultorioRepository,
} from '../../repository/consultorio-repository';

@Injectable()
export class FilesConsultorioService {
  constructor(
    @Inject(CONSULTARIO_REPOSITORY)
    private readonly consultarioRepository: ConsultorioRepository,
    private readonly consultorioCloudinaryService: CloudinaryService,
    private readonly handledErrors: HandleErrors,
  ) {}
  async findById(id: string) {
    const consultorio = await this.consultarioRepository.findById(id);
    if (!consultorio)
      this.handledErrors.handleErrorsBadRequestException(
        `El consultorio con ${id} no registrado`,
      );
    return consultorio;
  }

  async uploadFilePortada(file: Express.Multer.File, id: string) {
    const consultorio = await this.findById(id);
    await this.consultorioCloudinaryService.removeFile(
      consultorio.img_consultorio,
      consultorio.id_img_consultorio,
    );
    const results =
      await this.consultorioCloudinaryService.uploadFilePortada(file);

    await this.findByIdUpdatePortadaConsultorio(
      id,
      results.secure_url,
      results.public_id,
    );
  }
  async uploadFileLogo(file: Express.Multer.File, id: string) {
    const consultorio = await this.findById(id);
    await this.consultorioCloudinaryService.removeFile(
      consultorio.img_logo,
      consultorio.id_logo,
    );
    const results =
      await this.consultorioCloudinaryService.uploadFileLogo(file);

    await this.findByIdUpdateLogoConsultorio(
      id,
      results.secure_url,
      results.public_id,
    );
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
    return this.handledErrors.handleSendMessage(
      'Imagen actualizada exitosamente',
    );
  }

  async findByIdUpdatePortadaConsultorio(
    id: string,
    img_consultorio: string,
    id_img_consultorio: string,
  ) {
    await this.consultarioRepository.findByIdUpdateImgConsultorio(
      id,
      img_consultorio,
      id_img_consultorio,
    );

    return this.handledErrors.handleSendMessage(
      'Imagen actualizada exitosamente',
    );
  }
}
