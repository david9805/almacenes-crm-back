import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { AlmacenEntity } from "./almacen.entity";

// CREATE TABLE [dbo].[CONTACTOALMACEN](
// 	[IDCONTACTOALMACEN] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
// 	[IDALMACEN] [int] NULL,
// 	[ALMACEN] [varchar](100) NULL,
// 	[LOCAL] [varchar](50) NULL,
// 	[NOMBRES] [varchar](50) NULL,
// 	[APELLIDOS] [varchar](50) NULL,
// 	[CARGO] [varchar](50) NULL,
// 	[EMAIL] [varchar](100) NULL,
// 	[TELEFONO] [varchar](50) NULL,
// 	[CELULAR] [varchar](50) NULL,
// 	[USUARIOCREA] [varchar](50) NULL,
// 	[FECHACREACION] [datetime] NULL,
// 	[USUARIOMODIFICA] [varchar](50) NULL,
// 	[FECHAMODIFICA] [datetime] NULL,
//  CONSTRAINT [PK_CONTACTOALMACEN] PRIMARY KEY CLUSTERED 
// (
// 	[IDCONTACTOALMACEN] ASC
// )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
// ) ON [PRIMARY]
// GO

@Entity('CONTACTOALMACEN')
export class contactoAlmacenEntity {
    @PrimaryGeneratedColumn({name:'IDCONTACTOALMACEN'})
    idContactoAlmacen:number;

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