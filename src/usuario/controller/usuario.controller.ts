import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@ApiTags('Usuarios')
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/all')
  @HttpCode(HttpStatus.OK)
  async findAll() { 
    const user = await this.usuarioService.findAll();

    return user.map(user => ({
      id: user.id, 
      nome: user.nome, 
      emailUsuario: user.usuario, 
      foto: user.foto, 
      data: user.dataCadastro
    }))
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ParseIntPipe) id: number) {
    const user =  this.usuarioService.findById(id);

    return { 
      id: (await user).id, 
      nome: (await user).nome,  
      email: (await user).usuario, 
      foto: (await user).foto, 
      data: (await user).dataCadastro, 
      Apolice: (await user).apolice, 
      plano: (await user).plano
     }
  }

  @Post('/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: Usuario) {
    const info = await this.usuarioService.create(usuario);
    return {
      message: 'Usuário criado com sucesso!',
      id: info.id, 
      nome: info.nome, 
      email: info.usuario, 
      foto: info.foto, 
      data: info.dataCadastro
    };
  }
  
  @UseGuards(JwtAuthGuard)
  @Put('/atualizar')
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: Usuario) {
    const info = await this.usuarioService.update(usuario);
    return {
      message: 'Usuário atualizado com sucesso!',
      id: info.id, 
      nome: info.nome, 
      idade: info.idade,
      email: info.usuario, 
      foto: info.foto, 
      data: info.dataCadastro
    };
  }
  
  @UseGuards(JwtAuthGuard)
  @Delete('/deletar/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.delete(id);
    return {
      message: 'Usuário deletado com sucesso!'
    };
  }
}