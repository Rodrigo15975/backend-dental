import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { hashPassword } from 'src/common/utils/argon2/argonHash';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { ServicioFindService } from 'src/modules/servicios/services/find/find.service';
import { UsuarioFindService } from 'src/modules/usuarios/services/find/find.service';
import { CreateMedicoDto } from '../../dto/create-medico.dto';
import {
  MEDICO_REPOSITORY,
  MedicoRepository,
} from '../../repository/medico-repository';
import { MedicoFindService } from '../find/find.service';
import { MedicoCreate } from './types/typeCreate';

@Injectable()
export class MedicoCreateService implements MedicoCreate {
  constructor(
    @Inject(MEDICO_REPOSITORY)
    private readonly medicoRepository: MedicoRepository,
    private readonly medicoFindServices: MedicoFindService,
    private readonly handleErrors: HandleErrors,
    private readonly usuarioFindServices: UsuarioFindService,
    private readonly roleServices: RolesService,
    private readonly serviciosFindServices: ServicioFindService,
  ) {}
  async create(createMedicoDto: CreateMedicoDto): Promise<void> {
    const { dni, email, celular, contraseña, role, servicios } =
      createMedicoDto;
    await this.verifyRegisterMedico(dni, email, celular);
    const { _id } = await this.roleServices.findOne(role);

    const servicesIDS =
      await this.serviciosFindServices.findGetServicesAllId(servicios);

    const passwordHash = await hashPassword(contraseña);

    await this.medicoRepository.create({
      ...createMedicoDto,
      contraseña: passwordHash,
      role: _id,
      servicios: servicesIDS,
    });

    this.handleErrors.handleSendMessage('Creación exitosa');
  }

  private async verifyRegisterMedico(
    dni: string,
    email: string,
    celular: string,
  ) {
    await Promise.all([
      this.medicoFindServices.findByDniExisting(dni),
      this.medicoFindServices.findByPhoneExisting(celular),
      this.medicoFindServices.findByEmailExisting(email),

      this.usuarioFindServices.findByDniExistingInUsuario(dni),
      this.usuarioFindServices.findByEmailExistingInUsuario(email),
      this.usuarioFindServices.findByPhoneExistingInUsuario(celular),
    ]);
  }
}
