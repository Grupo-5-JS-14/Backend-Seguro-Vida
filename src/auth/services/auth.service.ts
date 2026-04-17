import { Injectable, UnauthorizedException, } from "@nestjs/common";
import { UsuarioLogin } from "../entities/usuariologin.entity";
import { JwtService } from "@nestjs/jwt";
import { UsuarioService } from "../../usuario/service/usuario.service";
import { Bcrypt } from "../bycript/bycript";

@Injectable()
export class AuthService {
    constructor(
        private readonly usuarioService: UsuarioService,
        private readonly jwtService: JwtService,
        private readonly bcrypt: Bcrypt,
    ) { }

    async validateUser(username: string, password: string): Promise<any> {
        const usuario = await this.usuarioService.findByUsuario(username);

        if (!usuario) {
            throw new UnauthorizedException("Usuário ou senha inválidos!");
        }

        const senhaOk = await this.bcrypt.compararSenha(password, usuario.senha);

        if (!senhaOk) {
            throw new UnauthorizedException("Usuário ou senha inválidos!");
        }

        const { senha, ...usuarioSemSenha } = usuario;
        return usuarioSemSenha;
    }

    async login(usuarioLogin: UsuarioLogin) {
        const usuarioValido = await this.validateUser(
            usuarioLogin.usuario,
            usuarioLogin.senha,
        );

        const payload = { sub: usuarioValido.id };

        return {
            id: usuarioValido.id,
            nome: usuarioValido.nome,
            usuario: usuarioValido.usuario,
            foto: usuarioValido.foto,
            token: `Bearer ${this.jwtService.sign(payload)}`,
        };
    }
}