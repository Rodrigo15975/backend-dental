import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { HandleErrors } from 'src/common/handleErrors/handle-errorst';
import { SharedMongodbModule } from 'src/shared/mongodb/Sharedmongodb.module';
import { SharedservicesModule } from 'src/shared/services/sharedservices.module';
import { AuthController } from './controller/auth.controller';
import { AuthJwt } from './jwt/auth-jwt';
import { AuthService } from './services/auth.service';

@Module({
  imports: [
    SharedservicesModule,
    SharedMongodbModule,
    JwtModule.register({
      secret: env.SECRET_AUTH,
      signOptions: {
        // cambiar a mas dias
        expiresIn: '1d',
      },
    }),
  ],
  providers: [AuthJwt, HandleErrors, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
// ACA ESTA LOS ARCHIVOS ATENRIORS ACA HACER UN NUEVO CLON DEL TEMPLATE
