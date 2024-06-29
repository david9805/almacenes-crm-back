import { Transform } from 'class-transformer';
import { IsInt, IsString, IsOptional, IsNumber, IsDateString, IsArray } from 'class-validator';

export class CreateAlmacenDto {
  @IsInt()
  @IsOptional()
  idalmacen?: number;

  @IsInt()
  @IsOptional()
  idSubTipoNegocio?: number;

  @IsString()
  @IsOptional()
  subTipoNegocio?: string;

  @IsInt()
  @IsOptional()
  idTipoNegocio?: number;

  @IsString()
  @IsOptional()
  tipoNegocio?: string;

  @IsString()
  @IsOptional()
  almacen?: string;

  @IsString()
  @IsOptional()
  razonSocial?: string;

  @IsString()
  @IsOptional()
  gerente?: string;

  @IsString()
  @IsOptional()
  cargoGerente?: string;

  @IsString()
  @IsOptional()
  telefono?: string;

  @IsString()
  @IsOptional()
  telefono2?: string;

  @IsString()
  @IsOptional()
  horario?: string;

  @IsString()
  @IsOptional()
  categoriaGeneral?: string;

  @IsInt()
  @IsOptional()
  cantidadEmpleados?: number;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  local?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsInt()
  @IsOptional()
  idSucursal?: number;

  @IsString()
  @IsOptional()
  sucursal?: string;

  @IsString()
  @IsOptional()
  administrador?: string;

  @IsString()
  @IsOptional()
  emailAdministrador?: string;

  @IsString()
  @IsOptional()
  telefonoAdministrador?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  clase?: number;

  @IsString()
  @IsOptional()
  controlFactura?: string;

  @IsNumber()
  @IsOptional()
  idZona?: number;

  @IsNumber()
  @IsOptional()
  metrosCuadrados?: number;

  @IsString()
  @IsOptional()
  contador?: string;

  @IsString()
  @IsOptional()
  telefonoContable?: string;

  @IsString()
  @IsOptional()
  emailContable?: string;

  @IsNumber()
  @IsOptional()
  coeficiente?: number;

  @IsString()
  @IsOptional()
  codigoAntiguo?: string;

  @IsString()
  @IsOptional()
  codigoNuevo?: string;

  @IsString()
  @IsOptional()
  pariticipa?: string;

  @IsDateString()
  @IsOptional()
  fechaInaguracion?: Date;

  @IsDateString()
  @IsOptional()
  fechaCierre?: Date;

  @IsString()
  @IsOptional()
  propietario?: string;

  @IsString()
  @IsOptional()
  NIT?: string;

  @IsString()
  @IsOptional()
  matricula?: string;

  @IsNumber()
  @IsOptional()
  area?: number;

  @IsString()
  @IsOptional()
  contadorLuz?: string;

  @IsString()
  @IsOptional()
  contadorAgua?: string;

  @IsNumber()
  @IsOptional()
  valorAdministracion?: number;

  @IsString()
  @IsOptional()
  tipo?: string;

  @IsString()
  @IsOptional()
  ubicacion?: string;

  @IsDateString()
  @IsOptional()
  fechaModifica?: Date;

  @IsString()
  @IsOptional()
  usuarioModifica?: string;

  @IsString()
  @IsOptional()
  zona?: string;

  @IsString()
  @IsOptional()
  zonaInterna?: string;

  @IsString()
  @IsOptional()
  fechaCreacion?: string;

  @IsString()
  @IsOptional()
  usuarioCrea?: string;

  @IsString()
  @IsOptional()
  nombreClase?: string;

  @IsString()
  @IsOptional()
  cargo?: string;

  @IsString()
  @IsOptional()
  horarioInicioSemana?: string;

  @IsString()
  @IsOptional()
  horarioFinalSemana?: string;

  @IsString()
  @IsOptional()
  horarioInicioWeekend?: string;

  @IsString()
  @IsOptional()
  horarioFinalWeekend?: string;

  @IsArray()
  @IsOptional()
  contactos?:any[];
}
