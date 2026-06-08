import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UploadedFile, UseGuards, UseInterceptors, } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { UsuarioService } from "../service/usuario.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CloudinaryService } from "../../cloudinary/cloudinary.service";

@ApiTags("Usuarios")
@Controller("/usuarios")
@ApiBearerAuth()
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}


  @Post("/upload-foto")
  @UseInterceptors(FileInterceptor("foto"))
  async uploadFoto(@UploadedFile() foto: Express.Multer.File) {
    const urlFoto = await this.cloudinaryService.uploadImage(foto)

    return {
      message: "Foto enviada para o cloud com sucesso!",
      foto: urlFoto,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put("/foto/:id")
  @UseInterceptors(FileInterceptor("foto"))
  async updateFoto(
    @Param("id",ParseIntPipe)id:number,
    @UploadedFile()foto: Express.Multer.File,
  ){
    const info = await this.usuarioService.updateFoto(id, foto);

    return{
      message:"Foto atulizada com sucesso.",
      id: info.id,
      name: info.nome,
      foto: info.foto,
    };
  }


  @UseGuards(JwtAuthGuard)
  @Get("/all")
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const user = await this.usuarioService.findAll();

    return user.map((user) => ({
      id: user.id,
      nome: user.nome,
      emailUsuario: user.usuario,
      foto: user.foto,
      data: user.dataCadastro,
    }));
  }

  @UseGuards(JwtAuthGuard)
  @Get("/:id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id", ParseIntPipe) id: number) {
    const user = await this.usuarioService.findById(id);

    return {
      id: user.id,
      nome: user.nome,
      email: user.usuario,
      foto: user.foto,
      data: user.dataCadastro,
      Apolice: user.apolice,
      plano: user.plano,
    };
  }


  @Post("/cadastrar")
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() usuario: Usuario) {
    const info = await this.usuarioService.create(usuario);

    return {
      message: "Usuário criado com sucesso!",
      id: info.id,
      nome: info.nome,
      email: info.usuario,
      foto: info.foto,
      data: info.dataCadastro,
    };
  }


  @UseGuards(JwtAuthGuard)
  @Put("/atualizar")
  @HttpCode(HttpStatus.OK)
  async update(@Body() usuario: Usuario) {
    const info = await this.usuarioService.update(usuario);

    return {
      message: "Usuário atualizado com sucesso!",
      id: info.id,
      nome: info.nome,
      idade: info.idade,
      email: info.usuario,
      foto: info.foto,
      data: info.dataCadastro,
    };
  }


  @UseGuards(JwtAuthGuard)
  @Delete("/deletar/:id")
  @HttpCode(HttpStatus.OK)
  async delete(@Param("id", ParseIntPipe) id: number) {
    await this.usuarioService.delete(id);

    return {
      message: "Usuário deletado com sucesso!",
    };
  }
}