import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateNotaDto } from '../../dto/create-nota.dto';
import { Nota } from '../../entities/nota.entity';

@Injectable()
export class NotaCreateService {
  constructor(
    @InjectModel(Nota.name) private readonly modelNotas: Model<Nota>,
  ) {}
  async create(createNotaDto: CreateNotaDto) {
    return await this.modelNotas.create(createNotaDto);
  }
}
