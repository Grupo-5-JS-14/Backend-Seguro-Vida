import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable()
export class Bcrypt {
    async criptografarSenha(senha: string): Promise<string> { 
       
        let saltos: number = 10; 
        return await bcrypt.hash(senha, saltos);
        //"Mistura" a senha 10 vezes (bcrypt), o "hash" é a nova senha segura
    }

    async compararSenha(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
        //Método para comparar as senhas
    }
}
