import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { hashPassword } from 'src/common/utils/argon2/argonHash';
import { CreateMedicoDto } from '../../dto/create-medico.dto';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFindService } from '../find/find.service';
import { MedicoCreate } from './types/typeCreate';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';

@Injectable()
export class MedicoCreateService implements MedicoCreate {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handleErrors: HandleErrors,
    private readonly usuarioFindServices: UsuarioFindService,
  ) {}
  async create(createMedicoDto: CreateMedicoDto): Promise<void> {
    const { dni, email, celular, contraseña } = createMedicoDto;

    await this.medicoFindServices.findByDniExisting(dni);
    await this.medicoFindServices.findByPhoneExisting(celular);
    await this.medicoFindServices.findByEmailExisting(email);

    await this.usuarioFindServices.findByDniExistingInUsuario(dni);
    await this.usuarioFindServices.findByEmailExistingInUsuario(email);
    await this.usuarioFindServices.findByPhoneExistingInUsuario(celular);

    const passwordHash = await hashPassword(contraseña);

    await this.medicoRepository.create({
      ...createMedicoDto,
      contraseña: passwordHash,
    });

    this.handleErrors.handleSendMessage('Creación exitosa');
  }
}
