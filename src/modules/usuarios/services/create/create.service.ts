import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { CreateUsuarioDto } from '../../dto/create-usuario.dto';
import {
  USUARIO_REPOSITORY,
  UsuarioRepository,
} from '../../repository/usuario-repository';
import { UsuarioFindService } from '../find/find.service';
import { UsuarioCreate } from './types/typesCreate';
import { hashPassword } from 'src/common/utils/argon2/argonHash';

@Injectable()
export class UsuarioCreateService implements UsuarioCreate {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly handleErrors: HandleErrors,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<void> {
    const { dni, celular, email, contraseña } = createUsuarioDto;

    await this.usuarioFindServices.findByDniExisting(dni);
    await this.usuarioFindServices.findByEmailExisting(email);
    await this.usuarioFindServices.findByPhoneExisting(celular);
    const passwordHash = await hashPassword(contraseña);

    await this.usuarioRepository.create({
      ...createUsuarioDto,
      contraseña: passwordHash,
    });

    this.handleErrors.handleSendMessage('Creación exitosa');
  }
}
