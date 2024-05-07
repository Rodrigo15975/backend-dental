import { Module } from '@nestjs/common';
import { HorarioService } from './services/horario.service';
import { HorarioController } from './controller/horario.controller';
import { SharedMongodbModule } from 'src/shared/mongodb/Sharedmongodb.module';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';

@Module({
  imports: [SharedMongodbModule],
  controllers: [HorarioController],
  providers: [HorarioService, HandleErrors],
})
export class HorarioModule {}
