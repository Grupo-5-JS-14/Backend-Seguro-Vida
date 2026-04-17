import { forwardRef, Module } from "@nestjs/common";

import { UsuarioModule } from "../usuario/usuario.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/constants";
import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";
import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { Bcrypt } from "../utils/bcrypt";

@Module({
    imports: [ //Lista de módulos que este módulo precisa usar
        forwardRef(() => UsuarioModule), //Resolve um problema de dependência circular
        PassportModule, //Passport é uma biblioteca de autenticação
        JwtModule.register({ //Configura o JWT (JSON Web Token) para autenticação
            secret: jwtConstants.secret, //Chave secreta usada para gerar/verificar tokens
            signOptions: {expiresIn: "1h"}, //Define validade do token
        })

    ],
    controllers: [AuthController], //Define quais controllers pertencem a este módulo
    providers: [Bcrypt, AuthService, LocalStrategy, JwtStrategy], //Serviços que este módulo oferece ou usa
    exports: [Bcrypt], //Define o que outros módulos podem usar deste módulo.
})
export class AuthModule {};