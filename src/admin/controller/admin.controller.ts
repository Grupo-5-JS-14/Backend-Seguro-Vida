import {
  Body, Controller, Delete, Get, HttpCode, HttpStatus,
  Param, ParseIntPipe, Post, Put, UseGuards
} from '@nestjs/common';
import { AdminAuthGuard } from '../../auth/guard/admin-auth.guard';
import { ApoliceService } from '../../apolice/service/apolice.service';
import { PlanoService } from '../../plano/service/plano.service';
import { UsuarioService } from '../../usuario/service/usuario.service';
import { Apolice } from '../../apolice/entities/apolice.entity';
import { Plano } from '../../plano/entities/plano.entity';
import { Usuario } from '../../usuario/entities/usuario.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@UseGuards(AdminAuthGuard)
@ApiBearerAuth()
@Controller('/admin')
export class AdminController {

  constructor(
    private readonly apoliceService: ApoliceService,
    private readonly planoService: PlanoService,
    private readonly usuarioService: UsuarioService,
  ) {}

  // APÓLICES 

  @Get('/apolices')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Lista todas as apólices com usuário e plano' })
  async findAllApolices() {
    const lista = await this.apoliceService.findAllAdmin();
    return lista.map(a => ({
      id: a.id,
      status: a.status,
      valorFinal: a.valorFinal,
      dataContratacao: a.dataContratacao,
      usuario: a.usuario ? { id: a.usuario.id, nome: a.usuario.nome, email: a.usuario.usuario } : null,
      plano: a.plano ? { id: a.plano.id, nome: a.plano.nome, valor: a.plano.valor } : null,
    }));
  }

  @Put('/apolices/atualizar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Atualiza uma apólice' })
  async updateApolice(@Body() apolice: Apolice) {
    const info = await this.apoliceService.update(apolice);
    return { message: 'Apólice atualizada com sucesso!', info };
  }

  @Delete('/apolices/deletar/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Deleta uma apólice' })
  async deleteApolice(@Param('id', ParseIntPipe) id: number) {
    await this.apoliceService.delete(id);
    return { message: 'Apólice deletada com sucesso!' };
  }

  // PLANOS 

  @Post('/planos/cadastrar')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: '[ADMIN] Cadastra um novo plano' })
  async createPlano(@Body() plano: Plano) {
    const novoPlano = await this.planoService.create(plano);
    return {
      message: 'Plano cadastrado com sucesso!',
      plano: novoPlano
    };
  }

  @Get('/planos')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Lista todos os planos com usuário contratante' })
  async findAllPlanos() {
    const lista = await this.planoService.findAllAdmin();
    return lista.map(p => ({
      id: p.id,
      nome: p.nome,
      descricao: p.descricao,
      valor: p.valor,
      usuario: p.usuario ? { id: p.usuario.id, nome: p.usuario.nome, email: p.usuario.usuario } : null,
    }));
  }

  @Put('/planos/atualizar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Atualiza um plano' })
  async updatePlano(@Body() plano: Plano) {
    const info = await this.planoService.update(plano);
    return { message: 'Plano atualizado com sucesso!', info };
  }

  @Delete('/planos/deletar/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Deleta um plano' })
  async deletePlano(@Param('id', ParseIntPipe) id: number) {
    await this.planoService.delete(id);
    return { message: 'Plano deletado com sucesso!' };
  }

  //  USUÁRIOS 

  @Get('/usuarios')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Lista todos os usuários com apólices e planos' })
  async findAllUsuarios() {
    const lista = await this.usuarioService.findAll();
    return lista.map(u => ({
      id: u.id,
      nome: u.nome,
      email: u.usuario,
      foto: u.foto,
      idade: u.idade,
      role: u.role,
      dataCadastro: u.dataCadastro,
      apolices: u.apolice,
      planos: u.plano,
    }));
  }

  @Put('/usuarios/atualizar')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Atualiza um usuário (incluindo role)' })
  async updateUsuario(@Body() usuario: Usuario) {
    const info = await this.usuarioService.update(usuario);
    return {
      message: 'Usuário atualizado com sucesso!',
      id: info.id,
      nome: info.nome,
      email: info.usuario,
      role: info.role,
    };
  }

  @Delete('/usuarios/deletar/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '[ADMIN] Deleta um usuário' })
  async deleteUsuario(@Param('id', ParseIntPipe) id: number) {
    await this.usuarioService.delete(id);
    return { message: 'Usuário deletado com sucesso!' };
  }
}
