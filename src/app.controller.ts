import { BadRequestException, Body, Controller, Get, Param, Post, Put, Query, Req, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateAlmacenDto } from './dto/almacen.dto';

@Controller('api/almacenes')
export class AppController {
  constructor(private readonly appService: AppService) {}


  @UseGuards(JwtAuthGuard)
  @Get('/user')
  findAllUser(){
    return this.appService.findAllUser();
  }

  
  @Post('/user')
  login(
    @Body() userData:any,
    @Request() req,
  ){
    return this.appService.login(userData,req);
  }

  @Post('/recover')
  recover(
    @Body() userData:any,
    @Request() req,
  )
  {
    return this.appService.recover(userData,req);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/almacen')  
  getAlmacen(
    @Query('name') nameAlmacen: string,
    @Query('page') page: number,
    @Query('pageElements') elementsPage: number,
    @Query('order') order: string,
  ){

    // Validate the order parameter

    const orderValue: 'ASC' | 'DESC' = order ? order.toUpperCase() === 'ASC' ? 'ASC' : order.toUpperCase() === 'DESC' ? 'DESC' : 'DESC' : 'DESC';
    
    return this.appService.getAlmacen(nameAlmacen,page,elementsPage,orderValue)
  }


  @UseGuards(JwtAuthGuard)
  @Post('/almacen')  
  postAlmacen(
    @Body() dataAlamacen: CreateAlmacenDto,
    @Request() req:any
  ){    
    return this.appService.postAlmacen(dataAlamacen,req)
  }

  @UseGuards(JwtAuthGuard)
  @Put('/almacen/:idAlmacen')  
  putAlmacen(
    @Body() dataAlamacen: CreateAlmacenDto,
    @Param('idAlmacen') idAlmacen: number,
    @Request() req:any
  ){
    
    return this.appService.putAlmacen(dataAlamacen,idAlmacen,req)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/almacen/:idAlmacen')  
  getAlmacenById(
    @Param('idAlmacen') idAlmacen: number
  ){
    
    return this.appService.getByIdAlmacen(idAlmacen)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/contactoAlmacen/:idAlmacen')  
  getContactoAlmacen(
    @Query('name') nameAlmacen: string,
    @Query('page') page: number,
    @Query('pageElements') elementsPage: number,
    @Query('order') order: string,
    @Query('all') all: string,
    @Param('idAlmacen') idAlmacen: number,
  ){

    // Validate the order parameter

    const orderValue: 'ASC' | 'DESC' = order ? order.toUpperCase() === 'ASC' ? 'ASC' : order.toUpperCase() === 'DESC' ? 'DESC' : 'DESC' : 'DESC';
    
    return this.appService.getContactoAlmacen(nameAlmacen,page,elementsPage,orderValue,idAlmacen,all)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/contactoAlmacen/:idContactoAlmacen/:idAlmacen')  
  getByIdContactoAlmacen(
    @Param('idContactoAlmacen') idContactoAlmacen: number,
    @Param('idAlmacen') idAlmacen: number,
  ){
    
    return this.appService.getByIdContactoAlmacen(idContactoAlmacen,idAlmacen)
  }

  @UseGuards(JwtAuthGuard)
  @Get('/tipoNegocio')
  getTipoNegocio(){
    return this.appService.getTipoNegocio();
  }

  @UseGuards(JwtAuthGuard)
  @Get('/subTipoNegocio/:idTipoNegocio')
  getSubTipoNegocio(
    @Param('idTipoNegocio') idTipoNegocio:number
  ){
    return this.appService.getSubTipoNegocio(idTipoNegocio);
  }
}
