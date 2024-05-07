import { HttpCode, Injectable } from '@nestjs/common';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { Medico } from '../entities/medico.entity';
import { MedicoRepository } from './medico-repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MedicoMongoRepository implements MedicoRepository {
  constructor(
    @InjectModel(Medico.name) private readonly medicoModel: Model<Medico>,
  ) {}
  async create(createMedicoDto: CreateMedicoDto): Promise<Medico> {
    return await this.medicoModel.create(createMedicoDto);
  }
  @HttpCode(204)
  async delete(id: string): Promise<void> {
    return await this.medicoModel.findByIdAndDelete(id);
  }
  async findAllMedicos(): Promise<Medico[]> {
    return await this.medicoModel.find().select('-contraseña').exec();
  }
  async update(id: string, updateMedicoDto: UpdateMedicoDto): Promise<Medico> {
    return await this.medicoModel
      .findByIdAndUpdate(id, updateMedicoDto, {
        new: true,
      })
      .exec();
  }

  async findByDniExisting(dni: string): Promise<Medico> {
    return await this.medicoModel.findOne({ dni }).exec();
  }
  async findByEmailExisting(email: string): Promise<Medico> {
    return await this.medicoModel.findOne({ email }).exec();
  }
  async findByPhoneExisting(celular: string): Promise<Medico> {
    return await this.medicoModel.findOne({ celular }).exec();
  }

  async findByDni(dni: string): Promise<Medico> {
    return await this.medicoModel.findOne({ dni });
  }
  async findByEmail(email: string): Promise<Medico> {
    return await this.medicoModel.findOne({ email });
  }
  async findById(id: string): Promise<Medico> {
    return await this.medicoModel.findById(id);
  }
  async findByPhone(celular: string): Promise<Medico> {
    return await this.medicoModel.findOne({ celular });
  }
}
