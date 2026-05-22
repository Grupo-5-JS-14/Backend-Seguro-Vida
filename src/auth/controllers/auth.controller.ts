import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { UsuarioLogin } from './../entities/usuariologin.entity';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Autenticação')
@Controller("/usuarios")
export class AuthController {
    constructor(private authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/logar')
    @ApiOperation({ summary: 'Login de usuário comum' })
    async login(@Body() usuario: UsuarioLogin): Promise<any> {
        const info = await this.authService.login(usuario);
        return {
            message: 'Acesso permitido!',
            id: info.id,
            nome: info.nome,
            usuario: info.usuario,
            foto: info.foto,
            role: info.role,
            acesso: info.token
        };
    }

    @UseGuards(LocalAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('/admin/logar')
    @ApiOperation({ summary: 'Login exclusivo para administradores' })
    async loginAdmin(@Body() usuario: UsuarioLogin): Promise<any> {
        const info = await this.authService.loginAdmin(usuario);
        return {
            message: 'Acesso admin permitido!',
            id: info.id,
            nome: info.nome,
            usuario: info.usuario,
            foto: info.foto,
            role: info.role,
            acesso: info.token
        };
    }
}