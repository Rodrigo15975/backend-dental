import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Paciente } from '../entities/paciente.entity';
import { Model, PipelineStage } from 'mongoose';
import { PacienteRepository } from './paciente-repository';
import {
  CreatePacienteDto,
  CreatePacienteMenorDto,
} from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';

@Injectable()
export class PacienteRepositoryMongo implements PacienteRepository {
  constructor(
    @InjectModel(Paciente.name) private readonly modelPaciente: Model<Paciente>,
  ) {}

  async aggregate(pipeline: PipelineStage[]): Promise<Paciente[]> {
    return await this.modelPaciente.aggregate(pipeline).exec();
  }

  async findById(id: string): Promise<Paciente> {
    return await this.modelPaciente.findById(id).exec();
  }
  async createPacienteMenor(
    createPacienteDto: CreatePacienteMenorDto,
    idNota: string,
    idAlergia: string,
  ): Promise<Paciente> {
    return await this.modelPaciente.create({
      ...createPacienteDto,
      email: '',
      celular: '',
      nota: idNota,
      alergia: idAlergia,
    });
  }

  async create(
    createPacienteDto: CreatePacienteDto,
    idNota: string,
    idAlergia: string,
  ): Promise<Paciente> {
    return await this.modelPaciente.create({
      ...createPacienteDto,
      nota: idNota,
      alergia: idAlergia,
    });
  }
  async delete(id: string): Promise<Paciente> {
    return await this.modelPaciente.findByIdAndDelete(id);
  }
  async findAll(): Promise<Paciente[]> {
    return await this.modelPaciente
      .find()
      .select([
        '_id',
        'name',
        'apellidos',
        'dni',
        'fechaRegistro',
        'horaRegistro',
        'mayorEdad',
      ]);
  }
  async update(
    id: string,
    updatePacienteDto: UpdatePacienteDto,
  ): Promise<Paciente> {
    return await this.modelPaciente
      .findByIdAndUpdate(id, updatePacienteDto, {
        new: true,
      })
      .exec();
  }

  async findByCelular(celular: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ celular });
  }
  async findByDni(dni: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ dni });
  }
  async findByEmail(email: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ email });
  }
  async findByExistingCelular(celular: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ celular });
  }
  async findByExistingDni(dni: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ dni });
  }
  async findByExistingEmail(email: string): Promise<Paciente> {
    return await this.modelPaciente.findOne({ email });
  }
}
