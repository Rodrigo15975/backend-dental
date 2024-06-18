import { Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { env } from 'process';
import { User } from '../types/type-auth';
export class AuthJwt extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([AuthJwt.stractJwtRequest]),
      secretOrKey: env.SECRET_AUTH,
      expiration: false,
    });
  }

  private static stractJwtRequest(@Req() req: Request): string | null {
    if (req.cookies && req.cookies.auth) return req.cookies.auth;
    return null;
  }

  async validate(user: User) {
    return user;
  }
}
