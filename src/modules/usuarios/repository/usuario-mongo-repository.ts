import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Usuario } from '../entities/usuario.entity';
import { Model } from 'mongoose';
import { UsuarioRepository } from './usuario-repository';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';

@Injectable()
export class UsuarioMongoRepository implements UsuarioRepository {
  constructor(
    @InjectModel(Usuario.name) private readonly usuarioModel: Model<Usuario>,
  ) {}
  async create(data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel.create(data);
  }
  async delete(id: string): Promise<Usuario> {
    return await this.usuarioModel.findByIdAndDelete(id);
  }
  async findByDni(dni: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ dni });
  }
  async findByEmail(email: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ email });
  }
  async findById(id: string): Promise<Usuario> {
    return await this.usuarioModel.findById(id);
  }
  async findByPhone(celular: string): Promise<Usuario> {
    return await this.usuarioModel.findOne({ celular });
  }
  async update(id: string, data: CreateUsuarioDto): Promise<Usuario> {
    return await this.usuarioModel
      .findByIdAndUpdate(id, { data }, { new: true })
      .exec();
  }
}
