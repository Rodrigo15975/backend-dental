import { CreateApoderadoDto } from 'src/modules/apoderado/dto/create-apoderado.dto';
import { Apoderado } from 'src/modules/apoderado/entities/apoderado.entity';

export interface CreateApoderado {
  create(createApoderadoDto: CreateApoderadoDto): Promise<Apoderado>;
}
