import { Injectable } from '@nestjs/common';
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

  async remove(id: string) {
    const usuario = await this.findById(id);
    await this.usuarioFileServices.removeFile(
      usuario.id_perfil,
      usuario.url_perfil,
    );
    await this.usuarioDeleteServices.delete(id);
  }

  async findAuthByUsuario(identifier: string) {
    return await this.usuarioFindServices.findAuthByUsuario(identifier);
  }
}
