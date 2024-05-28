import { Injectable } from '@nestjs/common';
import { CreateHistorialClinicaDto } from '../dto/create-historial-clinica.dto';
import { HistorialClinicoCreateService } from './create/create.service';
import { HistorialClinicaDeleteService } from './delete/delete.service';

@Injectable()
export class HistorialClinicaService {
  constructor(
    private readonly historialClinicoCreateServices: HistorialClinicoCreateService,
    private readonly historialClinicoDeleteServices: HistorialClinicaDeleteService,
  ) {}
  async create(
    createHistorialClinicaDto: CreateHistorialClinicaDto,
    id: string,
  ) {
    return await this.historialClinicoCreateServices.create(
      createHistorialClinicaDto,
      id,
    );
  }

  async remove(id: string) {
    return await this.historialClinicoDeleteServices.delete(id);
  }
}
