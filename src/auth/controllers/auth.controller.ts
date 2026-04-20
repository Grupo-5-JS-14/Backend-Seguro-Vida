import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Usuario')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    async login(@Body() usuario: UsuarioLogin): Promise<any> {
    
     const info = await this.authService.login(usuario);
        return {
         message: 'Acesso permitido!',
         usuario: info.usuario, foto: info.foto, acesso: info.token 
        };
    }
}