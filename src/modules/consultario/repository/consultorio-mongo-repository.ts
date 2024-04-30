import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Consultario } from '../entities/consultario.entity';
import { Model } from 'mongoose';
import { ConsultorioRepository } from './consultorio-repository';
import { CreateConsultarioDto } from '../dto/create-consultario.dto';

@Injectable()
export class ConsultarioMongoRespository implements ConsultorioRepository {
  constructor(
    @InjectModel(Consultario.name)
    private readonly consultarioModel: Model<Consultario>,
  ) {}

  async findById(id: string): Promise<Consultario> {
    return await this.consultarioModel.findById(id);
  }

  async findByIdUpdateImgConsultorio(
    id: string,
    img_consultorio: string,
    id_img_consultorio: string,
  ): Promise<Consultario> {
    return await this.consultarioModel
      .findByIdAndUpdate(id, {
        $set: { img_consultorio, id_img_consultorio },
      })
      .exec();
  }

  async findByIdUpdateLogoConsultorio(
    id: string,
    img_logo: string,
    id_logo: string,
  ): Promise<Consultario> {
    return await this.consultarioModel
      .findByIdAndUpdate(id, {
        $set: { img_logo, id_logo },
      })
      .exec();
  }
  async create(data: CreateConsultarioDto): Promise<Consultario> {
    return await this.consultarioModel.create(data);
  }
  async delete(id: string): Promise<Consultario> {
    return await this.consultarioModel.findByIdAndDelete(id).exec();
  }
  async find(): Promise<Consultario> {
    return await this.consultarioModel.findOne().exec();
  }
  async update(id: string, data: CreateConsultarioDto): Promise<Consultario> {
    return await this.consultarioModel
      .findByIdAndUpdate(id, data, {
        new: true,
      })
      .exec();
  }
}
