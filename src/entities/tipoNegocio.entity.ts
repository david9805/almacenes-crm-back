import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity('TIPONEGOCIO')
export class tipoNegocioEntity {
    @PrimaryGeneratedColumn({name:'IDTIPONEGOCIO'})
    idTipoNegocio:number;

    @Column({name:'TIPONEGOCIO',type:'varchar',length:200})
    tipoNegocio:string;    
}