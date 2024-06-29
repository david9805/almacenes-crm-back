import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('USUARIOS')
export class UserEntity {
    @PrimaryGeneratedColumn({ name: 'IDUSUARIO' })
    idUsuario: number;
  
    @Column({ name: 'USUARIO', type: 'varchar', length: 50, nullable: true })
    usuario: string;
  
    @Column({ name: 'NOMBRECOMPLETO', type: 'varchar', length: 50, nullable: true })
    nombreCompleto: string;
  
    @Column({ name: 'CLAVE', type: 'varchar', length: 50, nullable: true })
    clave: string;
  
    @Column({ name: 'ESTADO', type: 'varchar', length: 10, nullable: true })
    estado: string;
  
    // Agrega las demás columnas aquí...
  }
