import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { RolesKey } from 'src/modules/roles/entities/default-role';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { CreatePacienteDto } from '../../dto/create-paciente.dto';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteFindService } from '../find/find.service';
import { PacienteCreate } from './types/typesCreate';
import { NotaCreateService } from 'src/modules/nota/services/create/create.service';
import { AlergiasCreateService } from 'src/modules/alergias/services/create/create.service';

@Injectable()
export class PacienteCreateService implements PacienteCreate {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly roleService: RolesService,
    private readonly pacienteFindService: PacienteFindService,
    private readonly handledErrors: HandleErrors,
    private readonly notaCreateService: NotaCreateService,
    private readonly alergiasCreateService: AlergiasCreateService,
  ) {}

  async create(createPacienteDto: CreatePacienteDto): Promise<void> {
    await this.validatePacienteData(createPacienteDto);

    const ROLE = await this.assign(createPacienteDto.role);
    const nota = await this.notaCreateService.create({ nota: '' });
    const alergia = await this.alergiasCreateService.create({ alergias: '' });
    await this.pacienteRepository.create(
      {
        ...createPacienteDto,
        role: ROLE._id,
      },
      nota._id,
      alergia._id,
    );

    this.handledErrors.handleSendMessage('Paciente creado exitosamente');
  }
  private async assign(role: RolesKey) {
    return await this.roleService.findOne(role);
  }

  private async validatePacienteData(createPacienteDto: CreatePacienteDto) {
    const { celular, dni, email } = createPacienteDto;

    return await Promise.all([
      this.pacienteFindService.findByExistingDni(dni),
      this.pacienteFindService.findByExistingCelular(celular),
      this.pacienteFindService.findByExistingEmail(email),
    ]);
  }
}
