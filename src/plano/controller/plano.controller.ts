import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Plano } from "../entities/plano.entity";
import { PlanoService } from "../service/plano.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@UseGuards(JwtAuthGuard) 
@Controller("/planos")
export class PlanoController {

  constructor(private readonly planoService: PlanoService) {}

  @Get('/todos')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.planoService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.planoService.findById(id);
  }

  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string) {
    return this.planoService.findByNome(nome);
  }


  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() plano: Plano) {
    const info = await this.planoService.create(plano);
    return {
      message: 'Plano criado com sucesso!',
      info
    };
  }

  @Put('/atualizar')   
  @HttpCode(HttpStatus.OK)
  async update(@Body() plano: Plano) {
    const info = await this.planoService.update(plano);
    return {
      message: 'Plano atualizado com sucesso!',
      info
    };
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.planoService.delete(id);
    return {
      message: 'Plano deletado com sucesso!'
    };
  }
}