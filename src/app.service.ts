import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsOrderValue, Like, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { AlmacenEntity } from './entities/almacen.entity';
import { CreateAlmacenDto } from './dto/almacen.dto';
import { contactoAlmacenDto } from './dto/contactoAlmacen.dto';
import { contactoAlmacenEntity } from './entities/contactoAlmacen.entity';
import { tipoNegocioEntity } from './entities/tipoNegocio.entity';
import { subTipoNegocioEntity } from './entities/subTipoNegocio.entity';

@Injectable()
export class AppService {

  constructor (
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AlmacenEntity)
    private readonly almacenRepository: Repository<AlmacenEntity>,
    @InjectRepository(contactoAlmacenEntity)
    private readonly contactoAlmacenRepository: Repository<contactoAlmacenEntity>,
    @InjectRepository(tipoNegocioEntity)
    private readonly tipoNegocioRepository: Repository<tipoNegocioEntity>,
    @InjectRepository(subTipoNegocioEntity)
    private readonly subTipoNegocioRepository: Repository<subTipoNegocioEntity>,
    private readonly jwtService:JwtService,
  ){

  }
  getHello(): string {
    return 'Hello World!';
  }

  async findAllUser(){
    try{
      return this.userRepository.findAndCount();
    }    
    catch(error){
      this.catchError(error);
    }
  }

  async validateUser(username: string, pass: string): Promise<any> {
    try{
      const user = await this.userRepository.findOne({
        where:{
          nombreCompleto:username,
          clave:pass
        }
      });    
      if (user) {        
        return user;
      }
      else{
        this.catchError('Usuario o Contraseña Errados','Usuario o Contraseña Errados');
      }  
    }
    catch(error)      {
      this.catchError(error);
    }
  }

  async recover(userData: any,req) {
    try{      
      const user:UserEntity = await this.userRepository.findOne({
        where:{
          nombreCompleto:userData.usuario
        }
      });    
      if (user){        
        user.clave = userData.password;
        const result = await this.userRepository.save(user);
        
        return {
          element:result
        }
      }
      else{
        this.catchError('Usuario no encontrado','Usuario no encontrado');
      }           
    }
    catch(error){
      this.catchError(error);
    }    
  }
  
  async getAlmacen(name:string,page:number,pageElements:number,order: 'ASC' | 'DESC'){
    try{
      if (!page){
        page = 1
      }
  
      if (!pageElements){
        pageElements = 8
      }
      const where:any={}
  
      if (name){
        where.almacen = Like(`%${name}%`)
      }
      const orderOptions: { [key: string]: FindOptionsOrderValue } = {
        almacen: order
      };

      console.log(name,page,pageElements,order)
      
      const [data,count] = await this.almacenRepository.findAndCount({
        where:where,
        order:orderOptions,
        skip:(page)*pageElements,
        take:pageElements,
        relations:['contactos']
      })
  
      return {
        element:data,
        count:count
      }
    }
    catch(error){
      this.catchError(error);
    }
  }  

  async postAlmacen(dataAlmacen:CreateAlmacenDto,req:any){
    try{
      let user;
      if (req.user){
         user = req.user;
      }   
      const tipoNegocio = await this.getByIdTipoNegocio(parseInt(dataAlmacen.idTipoNegocio.toString()));
      const subTipoNegocio = await this.getByIdSubTipoNegocio(parseInt(dataAlmacen.idSubTipoNegocio.toString()));
      const arrayContacto = dataAlmacen.contactos ? dataAlmacen.contactos: [];     

      const newDataAlmacen:CreateAlmacenDto={
        idTipoNegocio:parseInt(dataAlmacen.idTipoNegocio.toString()),
        idSubTipoNegocio:parseInt(dataAlmacen.idSubTipoNegocio.toString()),
        clase:parseInt(dataAlmacen.clase.toString()),
        almacen:dataAlmacen.almacen,
        local:dataAlmacen.local,
        NIT:dataAlmacen.NIT,
        metrosCuadrados:parseFloat(dataAlmacen.metrosCuadrados.toString()),
        coeficiente:parseFloat(dataAlmacen.coeficiente.toString()),
        horario:dataAlmacen.horario,
        status:dataAlmacen.status,
        telefono:dataAlmacen.telefono2,
        telefono2:dataAlmacen.telefono2,
        razonSocial:dataAlmacen.razonSocial,
        valorAdministracion:parseFloat(dataAlmacen.valorAdministracion.toString()),
        usuarioCrea: user ? user.username: 'JJ',
        fechaCreacion: new Date(),
        tipoNegocio:tipoNegocio.element.tipoNegocio,
        subTipoNegocio:subTipoNegocio.element.subTipoNegocio
      }

      
      const almacen = new AlmacenEntity();
      // Asigna los valores del DTO a la entidad Almacen
      Object.assign(almacen, newDataAlmacen);      
      const result = await this.almacenRepository.save(almacen);
      console.log(result,arrayContacto);      
      if (arrayContacto){
         for(const contacto of arrayContacto){
          const dataContacto:contactoAlmacenDto={
            idAlmacen:result.idalmacen,
            almacen:result.almacen,
            local:result.local,
            nombres:contacto.nombres,
            apellidos:contacto.apellidos,
            cargo:contacto.cargo,
            email:contacto.email,
            telefono:contacto.telefono,
            celular:contacto.celular            
          }
          const resultContacto = await this.postContactoAlmacen(dataContacto,req);
         }
      }
      return result; // Opcional: podrías devolver algo específico después de crearlo, como el ID generado
    }
    catch(error){
      this.catchError(error);
    }
  }

  async putAlmacen(dataAlmacen:CreateAlmacenDto,idAlmacen:number,req:any){
    try{
      let user;
      if (req.user){
         user = req.user;
      }      

      const tipoNegocio = await this.getByIdTipoNegocio(parseInt(dataAlmacen.idTipoNegocio.toString()));
      const subTipoNegocio = await this.getByIdSubTipoNegocio(parseInt(dataAlmacen.idSubTipoNegocio.toString()));
      const arrayContacto = dataAlmacen.contactos ? dataAlmacen.contactos: [];     
      const almacen = await this.getByIdAlmacen(idAlmacen);

      const edtiDataAlmacen:CreateAlmacenDto={
        idTipoNegocio:parseInt(dataAlmacen.idTipoNegocio.toString()),
        idSubTipoNegocio:parseInt(dataAlmacen.idSubTipoNegocio.toString()),
        clase:parseInt(dataAlmacen.clase.toString()),
        almacen:dataAlmacen.almacen,
        local:dataAlmacen.local,
        NIT:dataAlmacen.NIT,
        metrosCuadrados:parseFloat(dataAlmacen.metrosCuadrados.toString()),
        coeficiente:parseFloat(dataAlmacen.coeficiente.toString()),
        horario:dataAlmacen.horario,
        status:dataAlmacen.status,
        telefono:dataAlmacen.telefono2,
        telefono2:dataAlmacen.telefono2,
        razonSocial:dataAlmacen.razonSocial,
        valorAdministracion:parseFloat(dataAlmacen.valorAdministracion.toString()),
        usuarioModifica: user ? user.username: 'JJ',
        fechaModifica: new Date(),
        tipoNegocio:tipoNegocio.element.tipoNegocio,
        subTipoNegocio:subTipoNegocio.element.subTipoNegocio
      }

      if (!almacen){
        this.catchError('Almacen no encontrado','Almacen no encontrado')
      }
      // Asigna los valores del DTO a la entidad Almacen
      Object.assign(almacen.element, edtiDataAlmacen);      
      const result = await this.almacenRepository.save(almacen.element);
      if (arrayContacto){
        for(const contacto of arrayContacto){
         const dataContacto:contactoAlmacenDto={
           idAlmacen:result.idalmacen,
           almacen:result.almacen,
           local:result.local,
           nombres:contacto.nombres,
           apellidos:contacto.apellidos,
           cargo:contacto.cargo,
           email:contacto.email,
           telefono:contacto.telefono,
           celular:contacto.celular            
         }
          await this.putContactoAlmacen(dataContacto,contacto.idContactoAlmacen,result.idalmacen,req);
        }
     }
      return result; // Opcional: podrías devolver algo específico después de crearlo, como el ID generado
    }
    catch(error){
      this.catchError(error);
    }
  }

  async getByIdAlmacen(idAlmacen:number){
    try{
      const result = await this.almacenRepository.findOne({
        where:{
          idalmacen:idAlmacen
        },
        relations:['contactos']
      });

      return {
        element:result
      }
    }
    catch(error){
      this.catchError(error);
    }
  }

  async getContactoAlmacen(name:string,page:number,pageElements:number,order: 'ASC' | 'DESC',idalmacen:number,all:any){
    try{
      let data,count;
      if (!page){
        page = 1
      }
  
      if (!pageElements){
        pageElements = 8
      }
      const where:any={}
  
      if (name){
        where.nombres = Like(`%${name}%`)
      }

      if(idalmacen){
        where.idAlmacen = idalmacen
      }
      const orderOptions: { [key: string]: FindOptionsOrderValue } = {
        nombres: order
      };
      
      if (!all){
        [data,count] = await this.contactoAlmacenRepository.findAndCount({
          where:where,
          order:orderOptions,
          skip:(page-1)*pageElements,
          take:pageElements,        
        });
      }
      else{
        [data,count] = await this.contactoAlmacenRepository.findAndCount({
          where:{
            idAlmacen:idalmacen
          }
        })
      }      
  
      return {
        element:data,
        count:count
      }
    }
    catch(error){
      this.catchError(error);
    }
  }

  async getByIdContactoAlmacen(idContactoAlmacen:number,idAlmacen:number){
    try{
      const result = await this.contactoAlmacenRepository.findOne({
        where:{
          idContactoAlmacen:idContactoAlmacen,
          idAlmacen:idAlmacen
        }
      });
      return{
        element:result
      }
    }
    catch(error){
      this.catchError(error);
    }
  }

  async postContactoAlmacen(dataContactoAlmacen:contactoAlmacenDto,req:any){
    try{
      let user;
      if (req.user){
         user = req.user;
      } 
      const contactoAlmacen = new contactoAlmacenEntity();
      // Asigna los valores del DTO a la entidad Almacen
      dataContactoAlmacen.fechaCreacion = new Date();
      dataContactoAlmacen.usuarioCrea = user ? user.username : 'JJ';
      Object.assign(contactoAlmacen, dataContactoAlmacen);      
      const result = await this.contactoAlmacenRepository.save(contactoAlmacen);
      return result; // Opcional: podrías devolver algo específico después de crearlo, como el ID generado
    }
    catch(error){
      this.catchError(error)
    }
  }

  async putContactoAlmacen(dataContactoAlmacen:contactoAlmacenDto,idContactoAlmacen:number,idAlmacen:number,req:any){
    try{
      let user;
      if (req.user){
         user = req.user;
      } 
      const getContactoAlmacen = await this.getByIdContactoAlmacen(idContactoAlmacen,idAlmacen);
      const contactoAlmacen = getContactoAlmacen.element;    
      if (!contactoAlmacen){        
        if (dataContactoAlmacen){
          const result = await this.postContactoAlmacen(dataContactoAlmacen,req);
          return result;
        }
      }
      else{
        dataContactoAlmacen.fechaModifica = new Date();
        dataContactoAlmacen.usuarioModifica = user ? user.username : 'JJ';
        // Asigna los valores del DTO a la entidad Almacen
        Object.assign(contactoAlmacen, dataContactoAlmacen);      
        const result = await this.contactoAlmacenRepository.save(contactoAlmacen);
        return result; // Opcional: podrías devolver algo específico después de crearlo, como el ID generado
      }            
    }
    catch(error){
      this.catchError(error);
    }
  }

  async getTipoNegocio(){
    try{
      const [data,count] = await this.tipoNegocioRepository.findAndCount();
      return {
        elements:data,
        count:count
      }
    }
    catch(err){
      this.catchError(err);
    }
  }
  
  async getByIdTipoNegocio(idTipoNegocio:number){
    try{
      const result = await this.tipoNegocioRepository.findOne({
        where:{
          idTipoNegocio:idTipoNegocio
        }
      })

      return {
        element:result
      }
    }
    catch(err){
      this.catchError(err);
    }
  }

  async getSubTipoNegocio(idTipoNegocio:number){
    try{
      const [data,count] = await this.subTipoNegocioRepository.findAndCount({
        where:{
          idTipoNegocio:idTipoNegocio
        }
      });

      return {
        elements:data,
        count:count
      }
    }
    catch(err){
      this.catchError(err);
    }
  }

  async getByIdSubTipoNegocio(idSubTipoNegocio:number){
    try{
      const result = await this.subTipoNegocioRepository.findOne({
        where:{
          idSubTipoNegocio:idSubTipoNegocio
        }
      });

      return {
        element:result
      }
    }
    catch(err){
      this.catchError(err)
    }
  }

  async login(userData:any,req){
    try{
      const user:UserEntity = await this.validateUser(userData.username,userData.password);    
      if (user){
        const payload = { username: user.nombreCompleto, sub: user.idUsuario, password: user.clave};
        const access_token = this.jwtService.sign(payload);
        return {
          access_token:access_token,
          username: user.nombreCompleto,
          idUsuario:user.idUsuario
        }
      }   
    }
    catch(err){
      this.catchError(err);
    }
  }


  private catchError(err, unexpectedMessage = 'Algo salió mal, inténtalo más tarde.') {
    console.error("Error -->", err);
    if (
      err instanceof ServiceUnavailableException ||
      err instanceof InternalServerErrorException ||
      err instanceof NotFoundException ||
      err instanceof ForbiddenException ||
      err instanceof BadRequestException
    ) {
      throw err;
    }
    throw new InternalServerErrorException(
      unexpectedMessage,
      {
        cause: err,
      },
    );
  }
}
