import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Repository } from 'typeorm';
import { contactoAlmacenEntity } from './contactoAlmacen.entity';

  @Entity('ALMACENES')
  export class AlmacenEntity{
    @PrimaryGeneratedColumn({name:'IDALMACEN'})
    idalmacen:number;

    @Column({name:'IDSUBTIPONEGOCIO',type:'int',nullable:true})
    idSubTipoNegocio:number;

    @Column({name:'SUBTIPONEGOCIO',type:'varchar',length:100,nullable:true})
    subTipoNegocio:string;

    @Column({name:'IDTIPONEGOCIO',type:'int',nullable:true})
    idTipoNegocio:number;

    @Column({name:'TIPONEGOCIO',type:'varchar',length:100,nullable:true})
    tipoNegocio:string;
    
    @Column({name:'ALMACEN',type:'varchar',length:200,nullable:true})
    almacen:string;

    @Column({name:'RAZONSOCIAL',type:'varchar',length:200,nullable:true})
    razonSocial:string;

    @Column({name:'GERENTE',type:'varchar',length:200,nullable:true})
    gerente:string;

    @Column({name:'CARGOGERENTE',type:'varchar',length:200,nullable:true})
    cargoGerente:string;

    @Column({name:'TELEFONO',type:'varchar',length:15,nullable:true})
    telefono:string;

    @Column({name:'TELEFONO2',type:'varchar',length:15,nullable:true})
    telefono2:string;

    @Column({name:'HORARIO',type:'varchar',length:100,nullable:true})
    horario:string;

    @Column({name:'CATEGORIAGENERAL',type:'varchar',length:100,nullable:true})
    categoriaGeneral:number;

    @Column({name:'CANTIDADEMPLEADOS',type:'int',nullable:true})
    cantidadEmpleados:number;

    @Column({name:'EMAIL',type:'varchar',length:100,nullable:true})
    email:string;

    @Column({name:'LOCAL',type:'varchar',length:50,nullable:true})
    local:string;

    @Column({name:'STATUS',type:'varchar',length:1,nullable:true})
    status:string;

    @Column({name:'IDSUCURSAL',type:'int',nullable:true})
    idSucursal:number

    @Column({name:'SUCURSAL',type:'varchar',length:100,nullable:true})
    sucursal:string;

    @Column({name:'ADMINISTRADOR',type:'varchar',length:100,nullable:true})
    administrador:string;

    @Column({name:'EMAILADMON',type:'varchar',length:100,nullable:true})
    emailAdministrador:string;

    @Column({name:'TELEFONOADMON',type:'varchar',length:15,nullable:true})
    telefonoAdministrador:string;

    @Column({name:'DIRECCION',type:'varchar',length:100,nullable:true})
    direccion:string;

    @Column({name:'CLASE',type:'smallint',nullable:true})
    clase:number ;

    @Column({name:'CONTROLFACTURA',type:'varchar',length:1,nullable:true})
    controlFactura:string;

    @Column({name:'IDZONA',type:'numeric',precision: 18, scale: 0,nullable:true})
    idZona:number;

    @Column({ name: 'METROSCUADRADOS', type: 'decimal', precision: 18, scale: 2, nullable: true })
    metrosCuadrados: number;

    @Column({name:'CONTADOR',type:'varchar',length:50,nullable:true})
    contador:string;

    @Column({name:'TELEFONOCONTABLE',type:'varchar',length:15,nullable:true})
    telefonoContable:string;

    @Column({name:'EMAILCONTABLE',type:'varchar',length:100,nullable:true})
    emailContable:string;

    @Column({ name: 'COEFICIENTE', type: 'numeric', precision: 18, scale: 6, nullable: true })
    coeficiente: number;

    @Column({ name: 'CODIGOANTIGUO', type: 'varchar', length:20, nullable: true })
    codigoAntiguo: string;

    @Column({ name: 'CODIGONUEVO', type: 'varchar', length:20, nullable: true })
    codigoNuevo: string;

    @Column({ name: 'PARTICIPA', type: 'varchar', length:1, nullable: true })
    pariticipa: string;

    @Column({ name: 'FECHAINAUGURACION', type: 'datetime', nullable: true })
    fechaInaguracion: Date;

    @Column({ name: 'FECHACIERRE', type: 'datetime', nullable: true })
    fechaCierre: Date;

    @Column({ name: 'PROPIETARIO', type: 'varchar', length:255, nullable: true })
    propietario: string;

    @Column({ name: 'NIT', type: 'varchar', length:15, nullable: true })
    NIT: string;

    @Column({ name: 'MATRICULA', type: 'varchar', length:20, nullable: true })
    matricula: string;

    @Column({ name: 'AREA', type: 'numeric', precision:18,scale:2, nullable: true })
    area: number;
    
    @Column({ name: 'CONTADORLUZ', type: 'varchar', length:1, nullable: true })
    contadorLuz: string;

    @Column({ name: 'CONTADORAGUA', type: 'varchar', length:1, nullable: true })
    contadorAgua: string;

    @Column({ name: 'VALORADMON', type: 'numeric', precision:18,scale:0, nullable: true })
    valorAdministracion: number;

    @Column({ name: 'TIPO', type: 'varchar', length:20, nullable: true })
    tipo: string;

    @Column({ name: 'UBICACION', type: 'varchar', length:50, nullable: true })
    ubicacion: string;

    @Column({ name: 'FECHAMODIFICA', type: 'datetime', nullable: true })
    fechaModifica: Date;

    @Column({ name: 'USUARIOMODIFICA', type: 'varchar', length:50, nullable: true })
    usuarioModifica: string;

    @Column({ name: 'ZONA', type: 'varchar', length:50, nullable: true })
    zona: string;

    @Column({ name: 'ZONAINTERNA', type: 'varchar', length:50, nullable: true })
    zonaInterna: string;

    @Column({ name: 'FECHACREACION', type: 'datetime', nullable: true })
    fechaCreacion: string;

    @Column({ name: 'USUARIOCREA', type: 'varchar', length:50, nullable: true })
    usuarioCrea: string;

    @Column({ name: 'NOMBRECLASE', type: 'varchar', length:50, nullable: true })
    nombreClase: string;

    @Column({ name: 'cargo', type: 'varchar', length:50, nullable: true })
    cargo: string;

    @Column({ name: 'HORAINICIOSEMANA', type: 'varchar', length:5, nullable: true })
    horarioInicioSemana: string;

    @Column({ name: 'HORAFINALSEMANA', type: 'varchar', length:5, nullable: true })
    horarioFinalSemana: string;

    @Column({ name: 'HORAINICIOWEEKEND', type: 'varchar', length:5, nullable: true })
    horarioInicioWeekend: string;

    @Column({ name: 'HORAFINALWEEKEND', type: 'varchar', length:5, nullable: true })
    horarioFinalWeekend: string;

    @OneToMany(() => contactoAlmacenEntity, contacto => contacto.almacenes)
    contactos: contactoAlmacenEntity[];
  }