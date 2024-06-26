import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';
import { CloudinaryResponse } from '../cloudinary/cloudinary.service';
@Injectable()
export class CloudinaryUsuarioService {
  cloud = cloudinary.config({
    cloud_name: this.config.getOrThrow('CLOUD_NAME'),
    api_key: this.config.getOrThrow('API_KEY_CLOUD'),
    api_secret: this.config.getOrThrow('API_SECRET_CLOUD'),
  });

  constructor(private readonly config: ConfigService) {}
  // el usuario es general (medico,usuario,pacientes)
  async uploadFileUsuarios(file: Express.Multer.File) {
    const result = await new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });

    return result;
  }
  async removeFile(id_perfil: string, url_perfil: string) {
    if (id_perfil && url_perfil) await cloudinary.uploader.destroy(id_perfil);
  }
}
