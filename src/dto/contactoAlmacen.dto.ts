import { IsBoolean, IsDateString, IsInt, IsOptional, IsString } from "class-validator";

export class contactoAlmacenDto {
    @IsOptional()
    @IsInt()
    idContactoAlmacen?:number;

    @IsOptional()
    @IsInt()
    idAlmacen?:number;

    @IsOptional()
    @IsString()
    almacen?:string;
    

    @IsOptional()
    @IsString()
    local?:string;

    @IsOptional()
    @IsString()
    nombres?:string;

    @IsOptional()
    @IsString()
    apellidos?:string;

    @IsOptional()
    @IsString()
    cargo?:string;

    @IsOptional()
    @IsString()
    email?:string;

    @IsOptional()
    @IsString()
    telefono?:string;

    @IsOptional()
    @IsString()
    celular?:string;

    @IsOptional()
    @IsString()
    usuarioCrea?:string;

    @IsOptional()
    @IsDateString()
    fechaCreacion?:Date;

    @IsOptional()
    @IsString()
    usuarioModifica?:string;

    @IsOptional()
    @IsDateString()
    fechaModifica?:Date;

    @IsOptional()
    @IsBoolean()
    edit?:boolean;
}