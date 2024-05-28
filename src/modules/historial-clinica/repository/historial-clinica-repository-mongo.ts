import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HistorialClinica } from '../entities/historial-clinica.entity';
import { Model } from 'mongoose';
import { HistorialClinicRepository } from './historial-clinica-repository';
import { CreateHistorialClinicaDto } from '../dto/create-historial-clinica.dto';

@Injectable()
export class HistorialClinicaRepositoryMongo
  implements HistorialClinicRepository
{
  constructor(
    @InjectModel(HistorialClinica.name)
    private readonly modelHistorialClinica: Model<HistorialClinica>,
  ) {}

  async delete(id: string): Promise<void> {
    await this.modelHistorialClinica.findByIdAndDelete(id);
  }

  async create(
    createHistorialClinicaDto: CreateHistorialClinicaDto,
  ): Promise<HistorialClinica> {
    return await this.modelHistorialClinica.create(createHistorialClinicaDto);
  }
}
