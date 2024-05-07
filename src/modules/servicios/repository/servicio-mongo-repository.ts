import { HttpCode, Injectable } from '@nestjs/common';
import { ServicioRepository } from './servicio-repository';
import { Servicio } from '../entities/servicio.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';

@Injectable()
export class ServicioMongoRespository implements ServicioRepository {
  constructor(
    @InjectModel(Servicio.name) private readonly servicioModel: Model<Servicio>,
  ) {}
  async addCountByService(id: string): Promise<void> {
    return await this.servicioModel.findByIdAndUpdate(id, {
      $set: { count: +1 },
    });
  }
  async create(createServiceDto: CreateServicioDto): Promise<Servicio> {
    return await this.servicioModel.create(createServiceDto);
  }
  async findById(id: string): Promise<Servicio> {
    return await this.servicioModel.findById(id);
  }

  @HttpCode(204)
  async delete(id: string): Promise<void> {
    await this.servicioModel.findByIdAndDelete(id).exec();
  }
  async findAllServices(): Promise<Servicio[]> {
    return await this.servicioModel.find().exec();
  }
  async findByService(nombre: string): Promise<Servicio> {
    return await this.servicioModel.findOne({ nombre }).exec();
  }
  async findByServiceExisting(nombre: string): Promise<Servicio> {
    return await this.servicioModel.findOne({ nombre }).exec();
  }
  async update(
    id: string,
    updateServiceDto: UpdateServicioDto,
  ): Promise<Servicio> {
    return await this.servicioModel.findByIdAndUpdate(id, updateServiceDto, {
      new: true,
    });
  }
}
