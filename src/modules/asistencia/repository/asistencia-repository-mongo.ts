import { Injectable } from '@nestjs/common';
import { AsistenciaRepositorio } from './asistencia-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Asistencia } from '../entities/asistencia.entity';
import { Model } from 'mongoose';
import { UpdateAsistenciaDto } from '../dto/update-asistencia.dto';
import { CreateAsistenciaDto } from '../dto/create-asistencia.dto';

@Injectable()
export class AsistenciaRepositoryMongo implements AsistenciaRepositorio {
  constructor(
    @InjectModel(Asistencia.name)
    private readonly modelAsistencia: Model<Asistencia>,
  ) {}

  async update(
    id: string,
    updateAsistenciaDto: UpdateAsistenciaDto,
  ): Promise<Asistencia> {
    delete updateAsistenciaDto.idMedico;
    return await this.modelAsistencia
      .findByIdAndUpdate(id, updateAsistenciaDto, { new: true })
      .exec();
  }
  async create(createAsistenciaDto: CreateAsistenciaDto): Promise<Asistencia> {
    return await this.modelAsistencia.create(createAsistenciaDto);
  }
}
