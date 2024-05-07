import { Injectable } from '@nestjs/common';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { MedicoCreateService } from './create/create.service';

@Injectable()
export class MedicosService {
  constructor(private readonly medicoCreateServices: MedicoCreateService) {}
  async create(createMedicoDto: CreateMedicoDto) {
    return await this.medicoCreateServices.create(createMedicoDto);
  }

  findAll() {
    return `This action returns all medicos`;
  }

  update(id: string, updateMedicoDto: UpdateMedicoDto) {
    return updateMedicoDto;
  }

  remove(id: string) {
    return `This action removes a #${id} medico`;
  }
}
