import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UpdateUsuarioDto } from '../dto/update-usuario.dto';
import { UsuarioCreateService } from './create/create.service';
import { UsuarioUpdateService } from './update/update.service';
import { UsuarioFindService } from './find/find.service';
import { UsuarioDeleteService } from './delete/delete.service';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly usuarioCreateServices: UsuarioCreateService,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly usuarioUpdateServices: UsuarioUpdateService,
    private readonly usuarioDeleteServices: UsuarioDeleteService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioCreateServices.create(createUsuarioDto);
  }

  async findAll() {
    return await this.usuarioFindServices.findAllUsuarios();
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuarioUpdateServices.update(updateUsuarioDto, id);
  }

  async remove(id: string) {
    return await this.usuarioDeleteServices.delete(id);
  }
}
