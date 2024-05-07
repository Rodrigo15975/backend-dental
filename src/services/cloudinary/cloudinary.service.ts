import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import { ConsultarioService } from 'src/modules/consultario/services/consultario.service';
import * as streamifier from 'streamifier';

export type CloudinaryResponse = UploadApiResponse | UploadApiErrorResponse;

// Es de la portada y del logo(ruc)
@Injectable()
export class CloudinaryService {
  cloud = cloudinary.config({
    cloud_name: this.config.getOrThrow('CLOUD_NAME'),
    api_key: this.config.getOrThrow('API_KEY_CLOUD'),
    api_secret: this.config.getOrThrow('API_SECRET_CLOUD'),
  });

  constructor(
    private readonly config: ConfigService,
    private readonly consultorioServices: ConsultarioService,
  ) {}

  async uploadFileLogo(file: Express.Multer.File, id: string) {
    const consultorio = await this.findConsultorio(id);
    await this.removeFile(consultorio.img_logo, consultorio.id_logo);

    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
    await this.consultorioServices.findByIdUpdateLogoConsultorio(
      id,
      result.secure_url,
      result.public_id,
    );
  }
  async updateFilePortada(id: string, url: string) {
    await cloudinary.uploader.upload(url, {
      public_id: id,
      overwrite: true,
    });
  }

  async uploadFilePortada(file: Express.Multer.File, id: string) {
    const consultorio = await this.findConsultorio(id);
    await this.removeFile(
      consultorio.img_consultorio,
      consultorio.id_img_consultorio,
    );
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
    await this.consultorioServices.findByIdUpdateImgConsultorio(
      id,
      result.secure_url,
      result.public_id,
    );
  }

  async findConsultorio(id: string) {
    return await this.consultorioServices.findById(id);
  }
  // Para eliminar el logo de la empresa
  private async removeFile(logo: string, id_logo: string) {
    if (logo && id_logo) await cloudinary.uploader.destroy(id_logo);
  }
}
