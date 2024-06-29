// src/auth/jwt.strategy.ts
import { Injectable, ServiceUnavailableException, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AppService } from 'src/app.service';
import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AppService) {    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_KEY,  // Cambia esto a tu clave secreta
    });
  }

  async validate(payload: any) {
    const { username, password } = payload;
    const user: UserEntity = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Usuario o Contraseña Errados');
    }
    return { userId: user.idUsuario, username: user.nombreCompleto };
  }
}
