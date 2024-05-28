import { Inject, Injectable } from '@nestjs/common';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { AlergiasCreateService } from 'src/modules/alergias/services/create/create.service';
import { CreateApoderadoDto } from 'src/modules/apoderado/dto/create-apoderado.dto';
import { ApoderadoCreateService } from 'src/modules/apoderado/services/create/create.service';
import { NotaCreateService } from 'src/modules/nota/services/create/create.service';
import { RolesKey } from 'src/modules/roles/entities/default-role';
import { RolesService } from 'src/modules/roles/services/roles.service';
import { CreatePacienteMenorDto } from '../../dto/create-paciente.dto';
import {
  PACIENTE_REPOSITORY,
  PacienteRepository,
} from '../../repository/paciente-repository';
import { PacienteFindService } from '../find/find.service';
import { PacienteCreateMenor } from './types/typesCreateMenor';

@Injectable()
export class PacienteCreateMenorService implements PacienteCreateMenor {
  constructor(
    @Inject(PACIENTE_REPOSITORY)
    private readonly pacienteRepository: PacienteRepository,
    private readonly handledErrors: HandleErrors,
    private readonly roleService: RolesService,
    private readonly pacienteFindService: PacienteFindService,
    private readonly apoderadoCreateService: ApoderadoCreateService,
    private readonly notaCreateService: NotaCreateService,
    private readonly alergiaCreateService: AlergiasCreateService,
  ) {}
  async createPacienteMenor(
    createPacienteDto: CreatePacienteMenorDto,
  ): Promise<void> {
    const { apoderado } = createPacienteDto;
    delete createPacienteDto.email;
    delete createPacienteDto.celular;

    await this.validatePacienteData(createPacienteDto);

    const dataApoderado = await this.getApoderado(apoderado);
    const ROLE = await this.assign(createPacienteDto.role);

    const nota = await this.notaCreateService.create({ nota: '' });
    const alergia = await this.alergiaCreateService.create({ alergias: '' });

    await this.pacienteRepository.createPacienteMenor(
      {
        ...createPacienteDto,
        role: ROLE._id,
        apoderado: dataApoderado._id,
      },
      nota._id,
      alergia._id,
    );

    this.handledErrors.handleSendMessage(
      'Paciente menor de edad fue creado exitosamente',
    );
  }
  private async assign(role: RolesKey) {
    return await this.roleService.findOne(role);
  }
  private async getApoderado(createApoderadoDto: CreateApoderadoDto) {
    return await this.apoderadoCreateService.create(createApoderadoDto);
  }
  private async validatePacienteData(
    createPacienteDto: CreatePacienteMenorDto,
  ) {
    const { dni } = createPacienteDto;
    await this.pacienteFindService.findByExistingDni(dni);
  }
}
