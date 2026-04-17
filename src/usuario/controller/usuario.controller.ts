import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";

@Controller("/usuarios")
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @Get('/all')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.usuarioService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.usuarioService.findById(id);
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: Usuario) {
    const data = await this.usuarioService.create(usuario);
    return {
      message: 'Usuário criado com sucesso!',
      data
    };
  }

  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: Usuario) {
    const data = await this.usuarioService.update(usuario);
    return {
      message: 'Usuário atualizado com sucesso!',
      data
    };
  }

  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.delete(id);
    return {
      message: 'Usuário deletado com sucesso!'
    };
  }
}