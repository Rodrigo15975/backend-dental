import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateApoderadoDto } from '../dto/create-apoderado.dto';
import { Apoderado } from '../entities/apoderado.entity';
import { ApoderadoRepository } from './apoderado-repository';
import { UpdateApoderadoDto } from '../dto/update-apoderado.dto';

@Injectable()
export class ApoderadoRepositoryMongo implements ApoderadoRepository {
  constructor(
    @InjectModel(Apoderado.name)
    private readonly modelApoderado: Model<Apoderado>,
  ) {}

  async update(data: UpdateApoderadoDto, id: string): Promise<void> {
    await this.modelApoderado.findByIdAndUpdate(id, data, { new: true });
  }

  async deleteAllApoderados(id: string): Promise<void> {
    await this.modelApoderado.findByIdAndDelete(id);
  }

  async create(createApoderadoDto: CreateApoderadoDto): Promise<Apoderado> {
    return await this.modelApoderado.create(createApoderadoDto);
  }

  async findByDni(dni: string): Promise<Apoderado> {
    return await this.modelApoderado
      .findOne({ dni })
      .select([
        '-_id',
        'dni',
        'nombre',
        'apellidos',
        'celular',
        'fuenteCaptacion',
        'email',
      ]);
  }
}
