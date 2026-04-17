import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../services/auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
//Strategy é a classe, PassportStrategy é a função que adapta ela pro Nest (usuario/senha)

    private _usernameField: string;
    private _passwordField: string;
    //Propriedades criadas na classe LocalStrategy

    constructor(private readonly authService: AuthService) {
    //readonly = não é possivel alterar

        super();
        //Conectando a estratégia de login (usuario/senha) com o NestJS e o Passport

        this._usernameField = 'usuario';
        this._passwordField = 'senha';
        //Diz ao Passport que o campo de usuário se chama usuario e o de senha senha
    }

    async validate(usuario: string, senha: string): Promise<any> {
        const validaUsuario = await this.authService.validateUser(usuario, senha);
        //Valida o login
        
        if (!validaUsuario) {
            throw new UnauthorizedException("Usuário e/ou senha incorretos!");
        }
        return validaUsuario;
    }

}