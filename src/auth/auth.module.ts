import { forwardRef, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";

import { UsuarioModule } from "../usuario/usuario.module";

import { AuthService } from "./services/auth.service";
import { AuthController } from "./controllers/auth.controller";

import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

import { jwtConstants } from "./constants/constants";
import { Bcrypt } from "../utils/bcrypt";

@Module({
  imports: [
    forwardRef(() => UsuarioModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" },
    }),
  ],

  controllers: [AuthController],

  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    Bcrypt,
  ],

  exports: [AuthService, Bcrypt, JwtModule],
})
export class AuthModule {}