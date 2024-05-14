import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
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

  constructor(private readonly config: ConfigService) {}

  async uploadFileLogo(file: Express.Multer.File) {
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

  async uploadFilePortada(file: Express.Multer.File) {
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

  // Para eliminar el logo de la empresa
  async removeFile(logo: string, id_logo: string) {
    if (logo && id_logo) await cloudinary.uploader.destroy(id_logo);
  }
}
