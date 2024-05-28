import { Inject, Injectable } from '@nestjs/common';
import { CreateApoderadoDto } from '../../dto/create-apoderado.dto';
import {
  APODERADO_REPOSITORY,
  ApoderadoRepository,
} from '../../repository/apoderado-repository';
import { CreateApoderado } from './types/typesCreate';
import { Apoderado } from '../../entities/apoderado.entity';

@Injectable()
export class ApoderadoCreateService implements CreateApoderado {
  constructor(
    @Inject(APODERADO_REPOSITORY)
    private readonly apoderadoRepository: ApoderadoRepository,
  ) {}

  async create(createApoderadoDto: CreateApoderadoDto): Promise<Apoderado> {
    return await this.apoderadoRepository.create(createApoderadoDto);
  }
}
