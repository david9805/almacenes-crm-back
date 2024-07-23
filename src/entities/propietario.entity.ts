import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AlmacenEntity } from "./almacen.entity";



@Entity('PROPIETARIOS')
export class propietarioEntity {
    @PrimaryGeneratedColumn({name:'IDPROPIETARIO'})
    idPropietario:number;

    @Column({name:'IDALMACEN',type:'int'})
    idAlmacen:number;

    @Column({name:'ALMACEN',type:'varchar',length:100})
    almacen:string;

    @ManyToOne(() => AlmacenEntity, almacen => almacen.contactos)
    @JoinColumn({ name: 'IDALMACEN' })
    almacenes: AlmacenEntity;

    @Column({name:'LOCAL',type:'varchar',length:50})
    local:string;

    @Column({name:'NOMBRES',type:'varchar',length:50})
    nombres:string;

    @Column({name:'APELLIDOS',type:'varchar',length:50})
    apellidos:string;

    @Column({name:'CARGO',type:'varchar',length:50})
    cargo:string;

    @Column({name:'EMAIL',type:'varchar',length:100})
    email:string;

    @Column({name:'TELEFONO',type:'varchar',length:50})
    telefono:string;

    @Column({name:'CELULAR',type:'varchar',length:50})
    celular:string;

    @Column({name:'USUARIOCREA',type:'varchar',length:50})
    usuarioCrea:string;

    @Column({name:'FECHACREACION',type:'datetime'})
    fechaCreacion:Date;

    @Column({name:'USUARIOMODIFICA',type:'varchar',length:50})
    usuarioModifica:string;

    @Column({name:'FECHAMODIFICA',type:'datetime'})
    fechaModifica:Date;
}