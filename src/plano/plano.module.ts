import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plano } from "./entities/plano.entity";
import { PlanoController } from "./controller/plano.controller";
import { PlanoService } from "./service/plano.service";

@Module({
    imports: [TypeOrmModule.forFeature([Plano])],
    providers: [PlanoService],
    controllers: [PlanoController],
    exports: [PlanoService]
})
export class PlanoModule {}