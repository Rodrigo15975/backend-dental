import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage, Types } from 'mongoose';
import { CreateMedicoDto } from '../dto/create-medico.dto';
import { UpdateMedicoDto } from '../dto/update-medico.dto';
import { Medico } from '../entities/medico.entity';
import { MedicoRepository } from './medico-repository';

@Injectable()
export class MedicoMongoRepository implements MedicoRepository {
  constructor(
    @InjectModel(Medico.name) private readonly medicoModel: Model<Medico>,
  ) {}

  async deleteServicesForMedico(id: string): Promise<void> {
    // El pull sol ose usa en arrays
    await this.medicoModel.updateMany(
      // SI ES vacio por que se actualizara en todo los documentos
      {
        // SOLO LOS DOCUMENTOS QUE COINCIDEN Y LOS ELIMINAMOS
        servicios: new Types.ObjectId(id),
      },
      {
        // solo elimina
        $pull: {
          servicios: new Types.ObjectId(id),
        },
      },
    );
  }

  async aggregate(pipeline: PipelineStage[]): Promise<Medico[]> {
    return await this.medicoModel.aggregate(pipeline).exec();
  }
  async aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T> {
    const result = await this.medicoModel.aggregate<T>(pipeline);
    return result as T;
  }

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
      .findByIdAndUpdate(
        id,
        { $set: { ...updateMedicoDto } },
        {
          new: true,
        },
      )
      .exec();
  }

  async updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void> {
    return await this.medicoModel.findByIdAndUpdate(id, {
      $set: {
        id_perfil,
        url_perfil,
      },
    });
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
    return await this.medicoModel.findById(id).select('-contraseña');
  }

  async findByPhone(celular: string): Promise<Medico> {
    return await this.medicoModel.findOne({ celular });
  }
}
