import { Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../types/type-auth';
export class AuthJwt extends PassportStrategy(Strategy, 'auth-jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        AuthJwt.stractJwtRequest,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: 'auth-dental-ochoa',
      ignoreExpiration: false,
    });
  }

  private static stractJwtRequest(@Req() req: Request): string | null {
    // ya llega los datos ( la cookie), por fin dios santo, estab afallando el secret
    if (req.cookies && req.cookies.auth) return req.cookies.auth;
    return null;
  }
  async validate(user: User) {
    return user;
  }
}
