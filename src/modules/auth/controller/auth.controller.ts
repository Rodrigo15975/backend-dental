import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthUserGuard } from '../guards/auth-guards';
import { AuthService } from '../services/auth.service';
import { AuthData, AuthDataPaciente } from '../types/type-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() data: AuthData,
    @Res({ passthrough: true }) res: Response,
  ) {    
    const auth = await this.authService.signIn(data);
    // asi envio la cookies para que me reconozca en produccion
    res.cookie('auth', auth, {
      sameSite: 'none',
      secure: true,
    });
    res.send({ auth });
  }

  @Post('paciente')
  async authPaciente(
    @Body() data: AuthDataPaciente,
    @Res({ passthrough: true }) res: Response,
  ) {
    const auth = await this.authService.authPacientes(data);
    res.cookie('auth', auth, {
      sameSite: 'none',
      secure: true,
    });
    res.send({ auth });

    // // asi envio la cookies para que me reconozca en produccion
    // const auth = await this.authService.signIn(data);
    // res.cookie('auth', auth, {
    //   sameSite: 'none',
    //   secure: true,
    // });
    // res.send({ auth });
  }

  @UseGuards(AuthUserGuard)
  @Get('verify')
  tokenSuccess() {
    return {
      success: true,
      statusCode: 200,
      message: 'Verification successful!',
    };
  }
  @UseGuards(AuthUserGuard)
  @Get('profile')
  getId(@Req() req: Request) {
    console.log(req.user);
    console.log(req.headers);
    return req.user;
  }

  @UseGuards(AuthUserGuard)
  @Get('logout')
  logout() {
    return { message: 'Sesión cerrada exitosa' };
  }
}
