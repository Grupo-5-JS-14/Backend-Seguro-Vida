import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Apolice } from '../entities/apolice.entity';
import { ApoliceService } from '../service/apolice.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)   
@Controller('apolices')
export class ApoliceController {

  constructor(private readonly apoliceService: ApoliceService) {}

  @Get('/todos')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.apoliceService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.apoliceService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() apolice: Apolice) {
    const info = await this.apoliceService.create(apolice);
    return {
      message: 'Apólice criada com sucesso!',
      
    };
  }

  @Put('/atualizar') 
  @HttpCode(HttpStatus.OK)
  async update(@Body() apolice: Apolice) {
    const info = await this.apoliceService.update(apolice);
    return {
      message: 'Apólice atualizada com sucesso!',
      info
    };
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.apoliceService.delete(id);
    return {
      message: 'Apólice deletada com sucesso!'
    };
  }
}