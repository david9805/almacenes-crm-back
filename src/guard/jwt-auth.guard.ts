// src/auth/jwt-auth.guard.ts
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    canActivate(context: ExecutionContext) {        
        return super.canActivate(context);
      }
    
    handleRequest(err, user, info) {
    if (err || !user) {
        if (info instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
        }

        throw err || new UnauthorizedException('Unauthorized access');
    }
        return user;
    }
}