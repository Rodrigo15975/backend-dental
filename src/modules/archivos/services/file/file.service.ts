import { Injectable } from '@nestjs/common';
import { CloudinaryUsuarioService } from 'src/services/cloudinary-usuario/cloudinary-usuario.service';

@Injectable()
export class ArchivoFileService {
  constructor(
    private readonly cloudinaryUsuariosServices: CloudinaryUsuarioService,
  ) {}
  async createFile(file: Express.Multer.File) {
    return await this.cloudinaryUsuariosServices.uploadFileUsuarios(file);
  }

  async removeFile(id_perfil: string, url: string) {
    await this.cloudinaryUsuariosServices.removeFile(id_perfil, url);
  }
}
