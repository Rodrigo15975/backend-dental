import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthUserGuard } from '../guards/auth-guards';
import { AuthService } from '../services/auth.service';
import { AuthData } from '../types/type-auth';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() data: AuthData) {
    const auth = await this.authService.signIn(data);
    return { auth };
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
    return req.user;
  }

  @UseGuards(AuthUserGuard)
  @Get('logout')
  logout() {
    return { message: 'Sesión cerrada exitosa' };
  }
}
