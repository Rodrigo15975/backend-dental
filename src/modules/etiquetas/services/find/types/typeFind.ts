import { Etiqueta } from 'src/modules/etiquetas/entities/etiqueta.entity';

export interface EtiquetaFind {
  findById(id: string): Promise<Etiqueta>;
  findAll(): Promise<Etiqueta[]>;
}
