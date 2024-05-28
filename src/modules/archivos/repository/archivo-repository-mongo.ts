import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Archivo } from '../entities/archivo.entity';
import { Model } from 'mongoose';
import { ArchivoRepository } from './archivo-repository';
import { CreateArchivoDto } from '../dto/create-archivo.dto';

@Injectable()
export class ArchivoRepositoryMongo implements ArchivoRepository {
  constructor(
    @InjectModel(Archivo.name) private readonly modelArchivo: Model<Archivo>,
  ) {}
  async delete(id: string): Promise<void> {
    await this.modelArchivo.findByIdAndDelete(id);
  }
  async create(
    createArchivoDto: CreateArchivoDto,
    id_url_archivo: string,
    url_archivo: string,
  ): Promise<Archivo> {
    return await this.modelArchivo.create({
      ...createArchivoDto,
      id_url_archivo,
      url_archivo,
    });
  }
}
