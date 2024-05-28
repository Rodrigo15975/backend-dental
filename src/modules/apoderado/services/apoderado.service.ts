import { Injectable } from '@nestjs/common';
import { CreateApoderadoDto } from '../dto/create-apoderado.dto';
import { ApoderadoCreateService } from './create/create.service';
import { ApoderadoFindService } from './find/find.service';

@Injectable()
export class ApoderadoService {
  constructor(
    private readonly apoderadoFindService: ApoderadoFindService,
    private readonly apoderadoCreateService: ApoderadoCreateService,
  ) {}
  async create(createApoderadoDto: CreateApoderadoDto) {
    return await this.apoderadoCreateService.create(createApoderadoDto);
  }

  async findByDni(dni: string) {
    return await this.apoderadoFindService.findByDni(dni);
  }
}
