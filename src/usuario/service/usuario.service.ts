import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../utils/bcrypt';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return await this.usuarioRepository.findOne({
      where: { usuario }
    });
  }

  async findAll(): Promise<Usuario[]> {

    const lista = await this.usuarioRepository.find({
      relations: { apolices: true }
    });

    if (lista.length === 0)
      throw new NotFoundException('Nenhum usuário encontrado!');

    return lista;
  }

  async findById(id: number): Promise<Usuario> {

    const usuario = await this.usuarioRepository.findOne({
      where: { id },
      relations: { apolices: true }
    });

    if (!usuario)
      throw new NotFoundException('Usuário não encontrado!');

    return usuario;
  }

  async create(usuario: Usuario): Promise<Usuario> {

    const existe = await this.findByUsuario(usuario.usuario);

    if (existe)
      throw new BadRequestException('Usuário já cadastrado!');

   
    if (usuario.idade < 18)
      throw new BadRequestException('Não elegível para este tipo de seguro.');

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);

    return await this.usuarioRepository.save(usuario);
  }

  async update(usuario: Usuario): Promise<Usuario> {

    await this.findById(usuario.id);

    const existe = await this.findByUsuario(usuario.usuario);

    if (existe && existe.id !== usuario.id)
      throw new BadRequestException('E-mail já cadastrado!');

    if (usuario.senha) {
      usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    }

    return await this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<void> {

    await this.findById(id);

    const result = await this.usuarioRepository.delete(id);

    if (result.affected === 0)
      throw new NotFoundException('Usuário não encontrado!');
  }
}