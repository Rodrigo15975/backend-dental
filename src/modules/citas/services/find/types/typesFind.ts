import { Cita } from 'src/modules/citas/entities/cita.entity';

export interface CitaFind {
  findAll(): Promise<Cita[]>;
  findById(id:string): Promise<Cita>;
}
