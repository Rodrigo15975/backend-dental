import { Injectable } from '@nestjs/common';
import { CreateApoderadoDto } from '../dto/create-apoderado.dto';
import { ApoderadoCreateService } from './create/create.service';
import { ApoderadoFindService } from './find/find.service';
import { UpdateApoderadoDto } from '../dto/update-apoderado.dto';
import { ApoderadoUpdateService } from './update/update.service';

@Injectable()
export class ApoderadoService {
  constructor(
    private readonly apoderadoFindService: ApoderadoFindService,
    private readonly apoderadoCreateService: ApoderadoCreateService,
    private readonly apoderadoUpdateService: ApoderadoUpdateService,
  ) {}
  async create(createApoderadoDto: CreateApoderadoDto) {
    return await this.apoderadoCreateService.create(createApoderadoDto);
  }

  async update(updateApoderadoDto: UpdateApoderadoDto) {
    return await this.apoderadoUpdateService.update(updateApoderadoDto);
  }

  async findByDni(dni: string) {
    return await this.apoderadoFindService.findByDni(dni);
  }
}
