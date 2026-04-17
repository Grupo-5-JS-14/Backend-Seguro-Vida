import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class Bcrypt {

  async criptografarSenha(senha: string): Promise<string> {
    return await bcrypt.hash(senha, 10);
  }

  async compararSenhas(senha: string, senhaCriptografada: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaCriptografada);
  }
}
