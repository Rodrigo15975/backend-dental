import { Injectable } from '@nestjs/common';
import { CreatePrescripcioneDto } from '../dto/create-prescripcione.dto';
import { PrescripcionesCreateService } from './create/create.service';
import { PrescripcionesFindService } from './find/find.service';

@Injectable()
export class PrescripcionesService {
  constructor(
    private readonly prescripcionesCreateServices: PrescripcionesCreateService,
    private readonly prescripcionesFindServices: PrescripcionesFindService,
  ) {}
  async create(createPrescripcioneDto: CreatePrescripcioneDto, id: string) {
    return await this.prescripcionesCreateServices.create(
      createPrescripcioneDto,
      id,
    );
  }

  async findAll() {
    return await this.prescripcionesFindServices.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} prescripcione`;
  }
}
