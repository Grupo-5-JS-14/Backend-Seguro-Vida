import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { ApoliceService } from '../service/apolice.service';

@Controller('apolices')
export class ApoliceController {
  constructor(private readonly apoliceService: ApoliceService) {}
  
  @Get() 
  @HttpCode(HttpStatus.OK)// pesquisar tudo
  findAll(){ // pesquisar todas os produtos
    return this.apoliceService.findAll();
  }
  @Get('/:id') // pesquisar por id
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number){ 
    return this.apoliceService.findById(id);
  }


  @Get('/status/:status')// pesquisar por nome
  @HttpCode(HttpStatus.OK)
  findByStatus(@Param('status') status: string) : Promise<Apolice[]>{ 
    return this.apoliceService.findByStatus(status);
  }  

  @Post()// criar cadastro
  @HttpCode(HttpStatus.OK)
  create(@Body() apolice: Apolice): Promise<Apolice>{  
    return this.apoliceService.create(apolice);
  }

  @Put() // atualizar cadastro
  @HttpCode(HttpStatus.OK)
  update(@Body() apolice: Apolice): Promise<Apolice>{
    return this.apoliceService.update(apolice);
  }

  @Delete('/:id') // deletar
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.apoliceService.delete(id);
  }
}
