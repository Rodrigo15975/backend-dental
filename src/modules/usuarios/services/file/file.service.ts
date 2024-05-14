import { Injectable } from '@nestjs/common';
import { Medico } from 'src/modules/medicos/entities/medico.entity';
import { MedicoUpdateService } from 'src/modules/medicos/services/update/update.service';

import { CloudinaryUsuarioService } from 'src/services/cloudinary-usuario/cloudinary-usuario.service';
import { Usuario } from '../../entities/usuario.entity';
import { UsuarioUpdateService } from '../update/update.service';
import { UsuarioFindService } from '../find/find.service';
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { RolesKey } from 'src/modules/roles/entities/default-role';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

// Si se usa directamente el UsuariosServices, se hace import circular
//  se importa las pequeñas fragciones de servicios usuario
// si llamo al servicio usuarios
// tambien estaria llamando este servicioFileService y saldria circul
// import circular
@Injectable()
export class UsuarioFileService {
  constructor(
    private readonly usuarioCloudinaryService: CloudinaryUsuarioService,
    private readonly medicoUpdateService: MedicoUpdateService,
    private readonly usuarioUpdateService: UsuarioUpdateService,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly medicoFindService: MedicoFindService,
    private readonly hanledErrors: HandleErrors,
  ) {}
  async createFile(file: Express.Multer.File, id: string, role: RolesKey) {
    if (!file)
      this.hanledErrors.handleErrorsBadRequestException('Archivo inválido');
    const { id_perfil, url_perfil } = await this.verifyRole(id, role);
    await this.usuarioCloudinaryService.removeFile(id_perfil, url_perfil);
    await this.addFile(id, role, file);
  }
  async verifyRole(id: string, role: RolesKey) {
    const functionsPromises: Promise<Usuario | Medico>[] = [];
    if (role === 'MEDICO')
      functionsPromises.push(this.medicoFindService.findById(id));
    if (role === 'USUARIO')
      functionsPromises.push(this.usuarioFindServices.findById(id));

    const results = await Promise.all(functionsPromises);
    return results.find((usuarios) => usuarios !== undefined);
  }

  private async addFile(id: string, role: RolesKey, file: Express.Multer.File) {
    const upload = await this.usuarioCloudinaryService.uploadFileUsuarios(file);
    if (role === 'MEDICO')
      return await this.medicoUpdateService.updateProfile(
        id,
        upload.public_id,
        upload.secure_url,
      );
    return await this.usuarioUpdateService.updateProfile(
      id,
      upload.public_id,
      upload.secure_url,
    );
  }
  async removeFile(id_perfil: string, url_perfil: string) {
    await this.usuarioCloudinaryService.removeFile(id_perfil, url_perfil);
  }
}
