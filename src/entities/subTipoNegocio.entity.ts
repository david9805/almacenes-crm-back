import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity('SUBTIPONEGOCIO')
export class subTipoNegocioEntity {
    @PrimaryGeneratedColumn({name:'IDSUBTIPONEGOCIO'})
    idSubTipoNegocio:number;

    @Column({name:'SUBTIPONEGOCIO',type:'varchar',length:200})
    subTipoNegocio:string; 
    
    @Column({name:'IDTIPONEGOCIO',type:'int',nullable:true})
    idTipoNegocio:number;
}