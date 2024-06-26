import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PipelineStage } from 'mongoose';
import { populateOptionsPaciente } from 'src/common/populate/paciente/populate-paciente';
import { monthlyStatsPipeline } from '../../../common/pipeline/paciente/pacientegetMounthPipeline';
import {
  CreatePacienteDto,
  CreatePacienteMenorDto,
} from '../dto/create-paciente.dto';
import { UpdatePacienteDto } from '../dto/update-paciente.dto';
import { Paciente } from '../entities/paciente.entity';
import { MonthlyStats } from '../services/find/types/typesFind';
import { PacienteRepository } from './paciente-repository';

@Injectable()
export class PacienteRepositoryMongo implements PacienteRepository {
  constructor(
    @InjectModel(Paciente.name) private readonly modelPaciente: Model<Paciente>,
  ) {}

  async findById(id: string): Promise<Paciente> {
    return await this.modelPaciente
      .findById(id)
      .select('-role')
      .populate(populateOptionsPaciente)
      .exec();
  }
  async aggregate(pipeline: PipelineStage[]): Promise<Paciente[]> {
    return await this.modelPaciente.aggregate(pipeline).exec();
  }
  async findForMounthStatistics(): Promise<MonthlyStats[]> {
    return await this.modelPaciente.aggregate(monthlyStatsPipeline);
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
        'fuenteCaptacion',
        'celular',
        'createdAt',
        'fechaNacimiento',
      ])
      .sort({
        createdAt: -1,
      });
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
    return await this.modelPaciente
      .findOne({ dni })
      .select(['_id', 'name', 'apellidos']);
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
