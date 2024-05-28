import {
  AsignarEtiquetas,
  CreateEtiquetaDto,
} from 'src/modules/etiquetas/dto/create-etiqueta.dto';

export interface EtiquetaCreate {
  create(createEtiquetaDto: CreateEtiquetaDto): Promise<void>;
  asignarEtiquetas(asignarEtiquetaDto: AsignarEtiquetas): Promise<void>;
}
