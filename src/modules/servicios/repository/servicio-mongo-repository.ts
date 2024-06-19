import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PropsCreateServicioDto } from '../dto/create-servicio.dto';
import { UpdateServicioDto } from '../dto/update-servicio.dto';
import { Servicio } from '../entities/servicio.entity';
import { ServicioRepository } from './servicio-repository';

@Injectable()
export class ServicioMongoRespository implements ServicioRepository {
  constructor(
    @InjectModel(Servicio.name) private readonly servicioModel: Model<Servicio>,
  ) {}
  async addCountByService(id: string): Promise<void> {
    return await this.servicioModel.findByIdAndUpdate(
      id,
      {
        $inc: { count: 1 },
      },
      { new: true },
    );
  }

  async findOneServiceTop(): Promise<Servicio> {
    return await this.servicioModel.findOne().sort({ count: -1 }).exec();
  }

  async create(createServiceDto: PropsCreateServicioDto): Promise<Servicio> {
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
    return await this.servicioModel
      .find()
      .select(['costo', 'nombre', '_id', 'count'])
      .exec();
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
