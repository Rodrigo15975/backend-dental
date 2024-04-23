import { Module } from '@nestjs/common';
import { RolesController } from './controller/roles.controller';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
@Module({
  imports: [SharedservicesModule],
  controllers: [RolesController],
})
export class RolesModule {}
