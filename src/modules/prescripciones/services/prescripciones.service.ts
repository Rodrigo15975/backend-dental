import { Injectable } from '@nestjs/common';
import { CreatePrescripcioneDto } from '../dto/create-prescripcione.dto';
import { PrescripcionesCreateService } from './create/create.service';

@Injectable()
export class PrescripcionesService {
  constructor(
    private readonly prescripcionesCreateServices: PrescripcionesCreateService,
  ) {}
  async create(createPrescripcioneDto: CreatePrescripcioneDto, id: string) {
    return await this.prescripcionesCreateServices.create(
      createPrescripcioneDto,
      id,
    );
  }
}
