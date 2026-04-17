import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Plano } from "../entities/plano.entity";

@Injectable()
export class PlanoService {
    constructor(
        @InjectRepository(Plano)
        private planoRepository: Repository<Plano>
    ) { }

    async findAll(): Promise<Plano[]> {
        return await this.planoRepository.find();
    }

    async findById(id: number): Promise<Plano> {

        let plano = await this.planoRepository.findOne({
            where: {
                id
            }
        });

        if (!plano)
            throw new HttpException('Plano não encontrado!', HttpStatus.NOT_FOUND);

        return plano;
    }

    async findByNome(nome: string): Promise<Plano[]> {
        return await this.planoRepository.find({
            where: {
                nome: ILike(`%${nome}%`)
            }
        });
    }

    async create(plano: Plano): Promise<Plano> {
        return await this.planoRepository.save(plano);
    }

    async update(plano: Plano): Promise<Plano> {

        await this.findById(plano.id);

        return await this.planoRepository.save(plano);
    }

    async delete(id: number): Promise<DeleteResult> {

        await this.findById(id);

        return await this.planoRepository.delete(id);
    }
}