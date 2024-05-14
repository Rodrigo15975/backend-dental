import { HttpCode, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Usuario } from '../entities/usuario.entity';
import { UsuarioRepository } from './usuario-repository';

@Injectable()
export class UsuarioMongoRepository implements UsuarioRepository {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}

  async aggregateGeneric<T>(pipeline: PipelineStage[]): Promise<T> {
    const results = await this.usuarioModel.aggregate<T>(pipeline);
    return results as T;
  }

  async findAllUsuarios(): Promise<Usuario[]> {
    return await this.usuarioModel.find().select('-contraseña');
  }
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.create(data);
  }
  @HttpCode(204)
  async delete(id: string): Promise<void> {
    return await this.usuarioModel.findByIdAndDelete(id);
  }
  async findByDni(dni: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ dni });
  }
  async findByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email });
  }
  async findById(id: string): Promise<Usuario> {
    return await this.usuarioModel.findById(id).select('-contraseña');
  }
  async findByPhone(celular: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ celular });
  }
  async update(id: string, data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndUpdate(
      id,
      { ...data },
      { new: true },
    );
  }
  async updateProfile(
    id: string,
    id_perfil: string,
    url_perfil: string,
  ): Promise<void> {
    return await this.usuarioModel.findByIdAndUpdate(id, {
      $set: {
        id_perfil,
        url_perfil,
      },
    });
  }

  async findByDniExisting(dni: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ dni }).exec();
  }
  async findByEmailExisting(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email }).exec();
  }
  async findByPhoneExisting(celular: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ celular }).exec();
  }
}
