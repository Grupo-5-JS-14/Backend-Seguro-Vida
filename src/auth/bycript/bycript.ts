import { Injectable } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@Injectable() //Decorator das classes de serviços
export class Bcrypt {
    async criptografarSenha(senha: string): Promise<string> { 
        //Cria o método de criptograr a senha

        let saltos: number = 10; //Quantas vezes a senha será "misturada"
        return await bcrypt.hash(senha, saltos);
        //"Mistura" a senha 10 vezes (bcrypt), "hash" é a nova senha segura
    }

    async compararSenha(senhaDigitada: string, senhaBanco: string): Promise<boolean> {
        return await bcrypt.compare(senhaDigitada, senhaBanco);
        //Método para comparar as senhas
    }
}