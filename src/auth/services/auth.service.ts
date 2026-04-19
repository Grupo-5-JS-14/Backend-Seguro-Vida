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
            //Pegue o buscaUsuario, tire a senha, e coloque o resto (...) em resposta
            return resposta
        }
        return null
    }

    async login(usuarioLogin: UsuarioLogin) {

        const payload = { sub: usuarioLogin.usuario }

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)

        if (!buscaUsuario) {
            throw new UnauthorizedException('Usuário não encontrado');

        }

        return {
            id: buscaUsuario?.id,
            nome: buscaUsuario?.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario?.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
            //Transforma o payload em um token JWT e coloca ele no formato Bearer (prefixo padrão)

        }
    }
}