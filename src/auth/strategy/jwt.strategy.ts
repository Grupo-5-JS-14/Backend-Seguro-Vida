import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { jwtConstants } from "../constants/constants";

@Injectable() //Essa classe pode ser injetada na provider
export class JwtStrategy extends PassportStrategy(Strategy) {
//Essa classe vai dizer como validar o token JWT

    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //Extrai o token (Do Bearer do auth.service)

            ignoreExpiration: false,
            //Se o token estiver expirado, o acesso é negado
            
            secretOrKey: jwtConstants.secret,
            //Chave secreta usada para validar o token (Tem que ser a mesma usada no auth.module)
        });
    }

    async validate(payload: any){
    //Valida o Token
        return payload;
    }
}