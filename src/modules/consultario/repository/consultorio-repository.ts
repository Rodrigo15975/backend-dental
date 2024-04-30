import { CreateConsultarioDto } from '../dto/create-consultario.dto';
import { UpdateConsultarioDto } from '../dto/update-consultario.dto';
import { Consultario } from '../entities/consultario.entity';

export const CONSULTARIO_REPOSITORY: string = 'ConsultorioRepository';

export interface ConsultorioRepository {
  create(data: CreateConsultarioDto): Promise<Consultario>;
  delete(id: string): Promise<Consultario>;
  update(id: string, data: UpdateConsultarioDto): Promise<Consultario>;
  find(): Promise<Consultario>;
  findById(id: string): Promise<Consultario>;
  findByIdUpdateImgConsultorio(
    id: string,
    img_consultorio: string,
    id_img_consultorio: string,
  ): Promise<Consultario>;
  findByIdUpdateLogoConsultorio(
    id: string,
    img_logo: string,
    id_logo: string,
  ): Promise<Consultario>;
}
