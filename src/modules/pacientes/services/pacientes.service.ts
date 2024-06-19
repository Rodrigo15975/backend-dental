import { Injectable } from '@nestjs/common';
import {
  CreatePacienteDto,
  CreatePacienteMenorDto,
} from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { PacienteCreateService } from './create/create.service';
import { PacienteUpdateService } from './update/update.service';
import { PacienteFindService } from './find/find.service';
import { PacienteDeleteService } from './delete/delete.service';
import { PacienteCreateMenorService } from './create/create-menor.service';
import { DetallesFindService } from 'src/modules/detalles/services/find/find.service';

@Injectable()
export class PacientesService {
  constructor(
    private readonly pacienteCreateService: PacienteCreateService,
    private readonly pacienteDeleteService: PacienteDeleteService,
    private readonly pacienteFindService: PacienteFindService,
    private readonly pacienteUpdateService: PacienteUpdateService,
    private readonly pacienteCreateMenorService: PacienteCreateMenorService,
    private readonly detallesFindService: DetallesFindService,
  ) {}
  async create(createPacienteDto: CreatePacienteDto) {
    return await this.pacienteCreateService.create(createPacienteDto);
  }
  async createPacienteMenor(createPacienteDto: CreatePacienteMenorDto) {
    return await this.pacienteCreateMenorService.createPacienteMenor(
      createPacienteDto,
    );
  }

  async findPacienteTop() {
    return await this.detallesFindService.findTopPacienteService();
  }

  async findAll() {
    return await this.pacienteFindService.findAll();
  }
  async findForMounthStatistics() {
    return await this.pacienteFindService.findForMounthStatistics();
  }

  async findById(id: string) {
    return await this.pacienteFindService.findById(id);
  }
  async findByDni(dni: string) {
    return await this.pacienteFindService.findByDni(dni);
  }

  async update(id: string, updatePacienteDto: UpdatePacienteDto) {
    return await this.pacienteUpdateService.update(id, updatePacienteDto);
  }

  async remove(id: string) {
    return await this.pacienteDeleteService.delete(id);
  }

  async removeMenor(id: string) {
    return await this.pacienteDeleteService.deletePacienteMenor(id);
  }
}
