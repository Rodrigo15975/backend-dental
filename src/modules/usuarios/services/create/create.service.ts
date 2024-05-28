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
import { MedicoFindService } from 'src/modules/medicos/services/find/find.service';
import { RolesService } from 'src/modules/roles/services/roles.service';

@Injectable()
export class UsuarioCreateService implements UsuarioCreate {
  constructor(
    @Inject(USUARIO_REPOSITORY)
    private readonly usuarioRepository: UsuarioRepository,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handleErrors: HandleErrors,
    private readonly roleServices: RolesService,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<void> {
    const { dni, celular, email, contraseña, role } = createUsuarioDto;

    await this.medicoFindServices.findByDniExistingInMedico(dni);
    await this.medicoFindServices.findByPhoneExistingInMedico(celular);
    await this.medicoFindServices.findByEmailExistingInMedico(email);

    await this.usuarioFindServices.findByDniExisting(dni);
    await this.usuarioFindServices.findByEmailExisting(email);
    await this.usuarioFindServices.findByPhoneExisting(celular);

    const passwordHash = await hashPassword(contraseña);
    const { _id } = await this.roleServices.findOne(role);
    await this.usuarioRepository.create({
      ...createUsuarioDto,
      contraseña: passwordHash,
      role: _id,
    });

    this.handleErrors.handleSendMessage('Usuario creado correctamente.');
  }
}
