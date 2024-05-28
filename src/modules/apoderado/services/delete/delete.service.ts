import { Inject, Injectable } from '@nestjs/common';
import {
  APODERADO_REPOSITORY,
  ApoderadoRepository,
} from '../../repository/apoderado-repository';

@Injectable()
export class ApoderadoDeleteService {
  constructor(
    @Inject(APODERADO_REPOSITORY)
    private readonly repositoryApoderado: ApoderadoRepository,
  ) {}

  async deleteAllApoderados(id: string): Promise<void> {
    await this.repositoryApoderado.deleteAllApoderados(id);
  }
}
