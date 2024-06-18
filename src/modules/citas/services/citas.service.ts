import { Injectable } from '@nestjs/common';
import { CreateCitaDto } from '../dto/create-cita.dto';
import { UpdateCitaDto, UpdateStatusCitaDto } from '../dto/update-cita.dto';
import { CitaCreateService } from './create/create.service';
import { CitaFindService } from './find/find.service';
import { CitasUpdateService } from './update/update.service';
import { CitaDeleteService } from './delete/delete.service';

@Injectable()
export class CitasService {
  constructor(
    private readonly citaCreateService: CitaCreateService,
    private readonly citaFindService: CitaFindService,
    private readonly citaUpdateService: CitasUpdateService,
    private readonly citaDeleteService: CitaDeleteService,
  ) {}
  async create(createCitaDto: CreateCitaDto) {
    return await this.citaCreateService.create(createCitaDto);
  }
  async findAll() {
    return await this.citaFindService.findAll();
  }

  async update(id: string, data: UpdateCitaDto) {
    return await this.citaUpdateService.update(data, id);
  }

  async updateChangeDate(id: string, data: UpdateCitaDto) {
    return await this.citaUpdateService.updateCitaChangeDate(data, id);
  }

  async updateCitaConfirmada(data: UpdateStatusCitaDto) {
    return await this.citaUpdateService.updateCitaConfirmada(data);
  }
  async updateCitaListaEspera(data: UpdateStatusCitaDto) {
    return await this.citaUpdateService.updateCitaListaEspera(data);
  }

  async updateCitaCancelar(data: UpdateStatusCitaDto) {
    return await this.citaUpdateService.updateCitaCancelar(data);
  }
  async updateCitaSala(data: UpdateStatusCitaDto) {
    return await this.citaUpdateService.updateCitaSala(data);
  }
  async updateCitaAtendida(data: UpdateStatusCitaDto) {
    return await this.citaUpdateService.updateCitaAtendida(data);
  }

  async deleteCita(idCita: string, idPaciente: string) {
    return await this.citaDeleteService.delete(idCita, idPaciente);
  }
}
