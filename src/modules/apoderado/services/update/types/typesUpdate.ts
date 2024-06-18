import { UpdateApoderadoDto } from 'src/modules/apoderado/dto/update-apoderado.dto';

export interface ApoderadoUpdate {
  update(data: UpdateApoderadoDto): Promise<void>;
}
