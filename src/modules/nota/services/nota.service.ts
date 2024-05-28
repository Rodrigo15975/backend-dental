import { Injectable } from '@nestjs/common';

import { CreateNotaDto } from '../dto/create-nota.dto';
import { UpdateNotaDto } from '../dto/update-nota.dto';
import { NotaCreateService } from './create/create.service';
import { NotaUpdateService } from './update/update.service';

@Injectable()
export class NotaService {
  constructor(
    private readonly notaCreateService: NotaCreateService,
    private readonly notaUpdateService: NotaUpdateService,
  ) {}
  async create(createNotaDto: CreateNotaDto) {
    return await this.notaCreateService.create(createNotaDto);
  }
  async update(id: string, updateNotaDto: UpdateNotaDto) {
    return await this.notaUpdateService.update(id, updateNotaDto);
  }
}
