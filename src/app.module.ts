import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserEntity } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AlmacenEntity } from './entities/almacen.entity';
import { contactoAlmacenEntity } from './entities/contactoAlmacen.entity';
import { tipoNegocioEntity } from './entities/tipoNegocio.entity';
import { subTipoNegocioEntity } from './entities/subTipoNegocio.entity';
import { propietarioEntity } from './entities/propietario.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mssql',
        host: configService.get<string>('DB_HOST'),
        // port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [UserEntity,AlmacenEntity,contactoAlmacenEntity,tipoNegocioEntity,subTipoNegocioEntity,propietarioEntity],
        options: {
          encrypt: true, // habilitar SSL
          trustServerCertificate: true, // confiar en el certificado autofirmado
        },
        synchronize: false, // No uses synchronize en producción, usa migraciones
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity,AlmacenEntity,contactoAlmacenEntity,tipoNegocioEntity,subTipoNegocioEntity,propietarioEntity]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_KEY,  // Cambia esto a tu clave secreta
      signOptions: { expiresIn: '60m' }, // Ajusta el tiempo de expiración según tus necesidades
    }),
  ],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
