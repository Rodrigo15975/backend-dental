import { Prescripciones } from 'src/modules/prescripciones/entities/prescripcione.entity';

export interface PrescripcionesFind {
  findAll(): Promise<Prescripciones[]>;
}
