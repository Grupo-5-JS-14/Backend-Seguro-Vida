import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from "../bycript/bycript";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/service/usuario.service";


@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService, 
        private jwtService: JwtService, 
        private bcrypt: Bcrypt 
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const buscaUsuario = await this.usuarioService.findByUsuario(username)

        if (!buscaUsuario)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)

        const matchPassword = await this.bcrypt.compararSenha(password, buscaUsuario.senha)

        if (!matchPassword)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)

        if (buscaUsuario && matchPassword) {
            const { senha, ...resposta } = buscaUsuario
            return resposta
        }
        return null
    }

    async login(usuarioLogin: UsuarioLogin) {
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        if (!buscaUsuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        // Inclui o role no payload do JWT
        const payload = { sub: buscaUsuario.usuario, role: buscaUsuario.role }

        return {
            id: buscaUsuario?.id,
            nome: buscaUsuario?.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario?.foto,
            role: buscaUsuario.role,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }

    async loginAdmin(usuarioLogin: UsuarioLogin) {
        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        if (!buscaUsuario) {
            throw new UnauthorizedException('Usuário não encontrado');
        }

        if (buscaUsuario.role !== 'admin') {
            throw new HttpException('Acesso negado. Apenas administradores podem usar esta rota.', HttpStatus.FORBIDDEN);
        }

        const payload = { sub: buscaUsuario.usuario, role: buscaUsuario.role }

        return {
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: buscaUsuario.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            role: buscaUsuario.role,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        }
    }
}