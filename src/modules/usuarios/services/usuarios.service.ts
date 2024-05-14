import { Injectable } from '@nestjs/common';
import { MedicosService } from 'src/modules/medicos/services/medicos.service';
import { RolesKey } from 'src/modules/roles/entities/default-role';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UsuarioCreateService } from './create/create.service';
import { UsuarioDeleteService } from './delete/delete.service';
import { UsuarioFileService } from './file/file.service';
import { UsuarioFindService } from './find/find.service';
import { UsuarioUpdateService } from './update/update.service';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioCreateServices: UsuarioCreateService,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly usuarioUpdateServices: UsuarioUpdateService,
    private readonly usuarioDeleteServices: UsuarioDeleteService,
    private readonly usuarioFileServices: UsuarioFileService,
    private readonly medicoServices: MedicosService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.usuarioCreateServices.create(createUsuarioDto);
  }

  async createFile(file: Express.Multer.File, id: string, role: RolesKey) {
    return await this.usuarioFileServices.createFile(file, id, role);
  }

  async findAll() {
    return await this.usuarioFindServices.findAllUsuarios();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioUpdateServices.update(updateUsuarioDto, id);
  }

  async updateProfile(id: string, id_perfil: string, url_perfil: string) {
    return await this.usuarioUpdateServices.updateProfile(
      id,
      id_perfil,
      url_perfil,
    );
  }

  async findById(id: string) {
    return await this.usuarioFindServices.findById(id);
  }

  async remove(id: string, role: RolesKey) {
    const usuario = await this.usuarioFileServices.verifyRole(id, role);

    await this.usuarioFileServices.removeFile(
      usuario.id_perfil,
      usuario.url_perfil,
    );
    if (role === 'MEDICO') return await this.medicoServices.remove(id);
    return await this.usuarioDeleteServices.delete(id);
  }

  async findAuthByUsuario(identifier: string) {
    return await this.usuarioFindServices.findAuthByUsuario(identifier);
  }
}
