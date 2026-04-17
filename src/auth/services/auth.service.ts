import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsuarioLogin } from '../entities/usuariologin.entity';
import { Bcrypt } from "../bycript/bycript";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/service/usuario.service";


@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuarioService, //buscar usuário no banco
        private jwtService: JwtService, //gerar o token JWT
        private bcrypt: Bcrypt //classe personalizada pra criptografia de senha
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        //Recebe usuário e senha

        const buscaUsuario = await this.usuarioService.findByUsuario(username)
        //Procura o Username no db

        if (!buscaUsuario)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)
        //ERROR 404

        const matchPassword = await this.bcrypt.compararSenha(password, buscaUsuario.senha)
        // Compara: senha digitada e senha criptografada do db

        if (!matchPassword)
            throw new HttpException('Usuário ou senha não encontrados!', HttpStatus.NOT_FOUND)
        //ERROR 404

        if (buscaUsuario && matchPassword) {
            //Se o usuário existe E a senha está certa

            const { senha, ...resposta } = buscaUsuario
            //Pegue o buscaUsuario, tire a senha, e coloque o resto (...) em resposta
            return resposta
        }
        return null
    }

    async login(usuarioLogin: UsuarioLogin) {
        //Recebe o UsuarioLogin da service

        const payload = { sub: usuarioLogin.usuario }
        //O dono do token (sub(subject)) é o usuarioLogin.usuario

        const buscaUsuario = await this.usuarioService.findByUsuario(usuarioLogin.usuario)
        //Procura o usuário pelo login no db

        if (!buscaUsuario) {
            throw new UnauthorizedException('Usuário não encontrado');
            //Se NÃO encontrar: ERROR 401
        }

        return {
            id: buscaUsuario.id,
            nome: buscaUsuario.nome,
            usuario: usuarioLogin.usuario,
            senha: '',
            foto: buscaUsuario.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
            //Transforma o payload em um token JWT e coloca ele no formato Bearer (prefixo padrão)

        }
    }
}