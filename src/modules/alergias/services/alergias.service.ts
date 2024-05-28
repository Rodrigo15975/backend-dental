import { Injectable } from '@nestjs/common';
import { CreateAlergiaDto } from '../dto/create-alergia.dto';
import { AlergiasCreateService } from './create/create.service';
import { UpdateAlergiaDto } from '../dto/update-alergia.dto';
import { AlergiasUpdateeService } from './update/update.service';

@Injectable()
export class AlergiasService {
  constructor(
    private readonly alergiasCreateService: AlergiasCreateService,
    private readonly alergiasUpdateService: AlergiasUpdateeService,
  ) {}
  async create(createAlergiaDto: CreateAlergiaDto) {
    return await this.alergiasCreateService.create(createAlergiaDto);
  }
  async update(id: string, updateAlergiaDto: UpdateAlergiaDto) {
    return await this.alergiasUpdateService.update(id, updateAlergiaDto);
  }
}
